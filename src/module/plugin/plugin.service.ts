import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyLoggerService } from 'src/module/help/logger/logger.service';
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
import { CacheKey } from 'src/common/constanst/constanst';
import { UsageRecordService } from '../usageRecord/usagerecord.service';
import { ServerService } from '../server/server.service';

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
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    private readonly logger: MyLoggerService,
    private readonly usageRecordService: UsageRecordService,
    private readonly serverService: ServerService,
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

    this.serverService.updateServeWithLock(incrementMap);
    this.usageRecordService.updateRecordsWithLock(incrementMap);
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
    if (!hasValidRecord) {
      this.logger.log(
        '[plugin][auth] 找不到套餐/套餐非生效中, userID: ',
        userID,
      );
      return false;
    }
    return { ok: true, id: userID };
  }

  async limiter(data: ILimiterDTO): Promise<ILimiterRepostDTO> {
    this.logger.log('[plugin][getLimiter]   data.id: ', data.id);
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
    this.logger.log('[plugin][getLimiter]  套餐生效中, record: ', userID);
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
}
