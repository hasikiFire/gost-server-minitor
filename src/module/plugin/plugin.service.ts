import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyLoggerService } from 'src/common/logger/logger.service';
import {
  IAuthUser,
  IEventsResponseDTO,
  ILimiterDTO,
  ILimiterRepostDTO,
} from 'src/common/DTO/observerDTO';
import { UsageRecord } from 'src/common/entities/UsageRecord';
import { User } from 'src/common/entities/User';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheKey } from 'src/common/constanst';

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
   * TODO 待观察，多用户是咋样的，有增量才会走这里吧？
   **/
  async observerGost(data: IEventsResponseDTO) {
    // 单位 byte
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
      if (!increment) return;
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

    const cacheKey = `${CacheKey.AUTH}-${userID}`;
    const value = await this.cacheManager.get(cacheKey);

    if (value) {
      return { ok: true, id: data.username };
    } else {
      // 缓存6h
      await this.cacheManager.set(cacheKey, data.username, 6 * 60 * 60 * 1000);
    }

    const user = await this.userRepository.findOne({
      where: {
        id: userID,
        // 一定要校验密码，这是基础，否则拿到ID就能无脑过，后续则不用
        passwordHash: data.password,
        status: 1,
      },
    });
    if (!user) return false;
    // 找到有效的使用记录
    const hasValidRecord = await this.usageRecordRepository.findOne({
      where: {
        userId: userID,
        purchaseStatus: 1,
      },
    });
    if (!hasValidRecord) return false;
    return { ok: true, id: userID };
  }

  async limiter(data: ILimiterDTO): Promise<ILimiterRepostDTO> {
    const userID = data.id;
    if (!userID) return { in: 0, out: 0 };

    const cacheKey = `${CacheKey.LIMITER}-${userID}`;
    const value = await this.cacheManager.get<number>(cacheKey);
    if (value) {
      return { in: value, out: value };
    }

    const record = await this.usageRecordRepository.findOne({
      where: {
        userId: userID,
        purchaseStatus: 1,
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

    // 缓存6h
    await this.cacheManager.set(cacheKey, limitNum, 1 * 60 * 60 * 1000);

    return { in: limitNum, out: limitNum };

    // TODO 网站过滤在此做？
  }

  /**
   * 会有死锁？
   * 死锁：事务 A 先锁定行 1，等待锁定行 2；事务 B 先锁定行 2，然后等待锁定行 1，最终两者相互等待，导致死锁
   * 分布式系统非常大概率会出现死锁！因为都是批量更新 usage_record 的场景！
   * 解决方法： 1. 对一个表而言，应尽量以固定的顺序存取表中的行
   * @param incrementMap
   */
  async updateRecordsWithLock(incrementMap: Record<number, number>) {
    const userIds = Object.keys(incrementMap).sort(); // 固定的顺序存取表中的行，这样只会发生锁的阻塞等待
    try {
      await this.usageRecordRepository.manager.transaction(
        async (transactionalEntityManager) => {
          let records = await transactionalEntityManager
            .createQueryBuilder(UsageRecord, 'usage_record')
            .setLock('pessimistic_write') // 行级锁
            .where('usage_record.userId IN (:...ids)', { ids: userIds })
            .getMany();

          records = records.map((v) => {
            const tempIncrement = Math.round(
              (incrementMap[v.userId] || 0) / 1024,
            );
            const gb = Math.round(tempIncrement / 1024 / 1024 / 1024);
            // 使用流量到达限制
            if (gb >= v.dataAllowance) {
              v.purchaseStatus = 2;

              // 删除本系统缓存，瞬间禁用
              const lKey = `${CacheKey.LIMITER}-${v.userId}`;
              const aKey = `${CacheKey.AUTH}-${v.userId}`;
              this.cacheManager.del(lKey);
              this.cacheManager.del(aKey);
              // TODO 通知其他 node 服务器也删除，避免用户切换服务器暂时还能用~~
              // TODO 统计本 node 服务器的流量用量，用完需要改状态
            }
            v.consumedDataTransfer += tempIncrement;
            return v;
          });

          await transactionalEntityManager.save(records);
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
