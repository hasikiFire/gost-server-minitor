import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyLoggerService } from 'src/common/logger/logger.service';
import {
  IAuthUser,
  IEventsResponseDTO,
  ILimiterDTO,
  ILimiterRepostDTO,
} from 'src/DTO/observerDTO';
import { UsageRecord } from 'src/entities/UsageRecord';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ICacheKey } from 'src/common/constanst';

/**
 * 本模块逻辑主要给 gost 流量经过判断用，逻辑应该简单并且使用缓存，不要设置太多日志
 */
@Injectable()
export class PluginService {
  private userTotalBytes: { [k: string]: number } = {};

  constructor(
    @InjectRepository(UsageRecord)
    private readonly usageRecordRepository: Repository<UsageRecord>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly logger: MyLoggerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**
   * 在 gost.yaml 中设置触发间隔，默认为5分钟
   *
   **/
  async observerGost(data: IEventsResponseDTO) {
    const incrementMap: { [k: string]: number } = {};
    data.events.forEach((v) => {
      // TODO 待优化成根据client来计算
      // const userID = v.id;
      const userID = v.service.split('-')[1];
      // gost 程序启动后累计
      const totalByte =
        (v.stats?.inputBytes ?? 0) + (v.stats?.outputBytes ?? 0);
      const previousTotalByte = this.userTotalBytes[userID] || 0;
      this.userTotalBytes[userID] = totalByte;

      // 计算增量
      const increment = totalByte - previousTotalByte;
      // 更新 userID 的 totalByte
      if (!incrementMap[userID]) {
        incrementMap[userID] = 0;
      }
      incrementMap[userID] = incrementMap[userID] + increment;
    });

    this.updateRecordsWithLock(incrementMap);
  }

  async auth(data: IAuthUser) {
    if (!data) return false;
    const userID = data.username.split('-')?.[1] || '';
    if (!userID) return false;

    const cacheKey = `${ICacheKey.AUTH}-${data.username}-${data.password}`;
    const value = await this.cacheManager.get(cacheKey);

    if (value) {
      return { ok: true, id: data.username };
    } else {
      // 缓存24h
      await this.cacheManager.set(cacheKey, data.username, 24 * 60 * 60 * 1000);
    }

    const user = await this.userRepository.findOne({
      where: {
        id: userID,
        // 一定要校验密码，这是基础，否则拿到ID就能无脑过，后续则不用
        passwordHash: data.password,
      },
    });
    if (!user) return false;
    return { ok: true, id: userID };
  }

  async limiter(data: ILimiterDTO): Promise<ILimiterRepostDTO> {
    const userID = data.id;
    if (!userID) return { in: 0, out: 0 };

    const cacheKey = `${ICacheKey.LIMITER}-${userID}`;
    const value = await this.cacheManager.get<number>(cacheKey);
    if (value) {
      return { in: value, out: value };
    }

    const record = await this.usageRecordRepository.findOne({
      where: {
        userId: userID,
      },
    });
    if (!record || record.purchaseStatus !== 1) {
      this.logger.log(
        '[plugin][getLimiter] 找不到套餐/套餐非生效中, userID: ',
        userID,
      );
      return { in: 0, out: 0 };
    }
    const limitNum = record.speedLimit
      ? record.speedLimit * 1024 * 1024
      : 99999 * 1024 * 1024; // 无限制

    // 缓存24h
    await this.cacheManager.set(cacheKey, limitNum, 24 * 60 * 60 * 1000);

    return { in: limitNum, out: limitNum };

    // TODO 网站过滤在此做？
  }

  async updateRecordsWithLock(incrementMap: Record<number, number>) {
    const userIds = Object.keys(incrementMap);
    try {
      await this.usageRecordRepository.manager.transaction(
        async (transactionalEntityManager) => {
          let records = await transactionalEntityManager
            .createQueryBuilder(UsageRecord, 'usage_record')
            .setLock('pessimistic_write') // 行级锁
            .where('usage_record.userId IN (:...ids)', { ids: userIds })
            .getMany();

          records = records.map((v) => {
            v.consumedDataTransfer += Math.round(
              (incrementMap[v.userId] || 0) / 1024,
            );
            return v;
          });

          await transactionalEntityManager.save(records);
          // TODO 到达限制流量更新 usageRecord 状态为流量用尽
          this.logger.log(
            '[pluginService][listenGost]  update records success',
          );
        },
      );
    } catch (e) {
      this.logger.error('[pluginService][listenGost]  update records faild', e);
    }
  }
}
