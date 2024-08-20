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
    console.log('data: ', data);
    // 分用户去记录写入数据库。5分钟
    // 核心问题， inputBytes 啥时候开始计算？gost 程序开始？or 监听开始？ 应用程序重启又怎么计算 ？
    //     curl -XPOST http://127.0.0.1:8000/observer \
    // -d '{"events":[
    // {"kind":"service","service":"service-0","type":"stats",
    // "stats":{"totalConns":1,"currentConns":0,"inputBytes":235,"outputBytes":632,"totalErrs":0}}
    // ]}'
    const incrementMap: { [k: string]: number } = {};
    data.events.forEach((v) => {
      const userID = v.service.split('-')[1];
      // gost 程序启动后累计
      const totalByte =
        (v.status.inputBytes ?? 0) + (v.status.outputBytes ?? 0);
      this.userTotalBytes[userID] = totalByte;
      const previousTotalByte = this.userTotalBytes[userID] || 0;

      // 计算增量
      const increment = totalByte - previousTotalByte;
      // 更新 userID 的 totalByte
      if (!incrementMap[userID]) {
        incrementMap[userID] = 0;
      }
      incrementMap[userID] = incrementMap[userID] + increment;
    });
    try {
      const userIds = Object.keys(incrementMap);
      let records = await this.usageRecordRepository
        .createQueryBuilder('entity')
        .setLock('pessimistic_write') // 行级锁
        .where('entity.id IN (:...ids)', { ids: userIds })
        .getMany();
      console.log('records: ', records);
      records = records.map((v) => {
        v.consumedDataTransfer += incrementMap[v.userId] || 0;
        return v;
      });
      await this.usageRecordRepository.save(records);
    } catch (e) {
      this.logger.error(
        '[ObseverService][listenGost]  update records faild',
        e,
      );
    }
  }

  // async updateRecordsWithLock(
  //   userIds: number[],
  //   incrementMap: Record<number, number>,
  // ) {
  //   await getManager().transaction(async (transactionalEntityManager) => {
  //     // Step 1: 使用悲观锁读取数据
  //     const records = await transactionalEntityManager
  //       .createQueryBuilder('entity')
  //       .setLock('pessimistic_write') // 行级锁
  //       .where('entity.id IN (:...userIds)', { userIds })
  //       .getMany();

  //     // Step 2: 更新记录
  //     const updatedRecords = records.map((record) => {
  //       const increment = incrementMap[record.id] || 0;
  //       record.consumedDataTransfer =
  //         (record.consumedDataTransfer || 0) + increment;
  //       return record;
  //     });

  //     // Step 3: 保存更新后的记录
  //     await transactionalEntityManager.save(updatedRecords);
  //   });
  // }
}
