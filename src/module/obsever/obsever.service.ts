/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyLoggerService } from 'src/common/logger/logger.service';
import { IEventsResponseDTO } from 'src/DTO/observerDTO';
import { UsageRecord } from 'src/entities/UsageRecord';
import { Repository } from 'typeorm';

@Injectable()
export class ObseverService {
  private userTotalBytes: { [k: string]: number } = {};

  constructor(
    @InjectRepository(UsageRecord)
    private readonly usageRecordRepository: Repository<UsageRecord>,
    private readonly logger: MyLoggerService,
  ) {}

  async listenGost(data: IEventsResponseDTO) {
    // TODO 待优化成根据client来计算
    const incrementMap: { [k: string]: number } = {};
    data.events.forEach((v) => {
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
          this.logger.log(
            '[ObseverService][listenGost]  update records success',
          );
        },
      );
    } catch (e) {
      this.logger.error(
        '[ObseverService][listenGost]  update records faild',
        e,
      );
    }
  }
}
