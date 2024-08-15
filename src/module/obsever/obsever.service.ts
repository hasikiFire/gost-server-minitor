/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEventsResponseDTO } from 'src/DTO/observerDTO';
import { UsageRecord } from 'src/entities/UsageRecord';
import { Repository } from 'typeorm';

@Injectable()
export class ObseverService {
  constructor(
    @InjectRepository(UsageRecord)
    private readonly usageRecordRepository: Repository<UsageRecord>,
  ) {}

  async listenGost(data: IEventsResponseDTO) {
    console.log('data: ', data);
    // TODO 分用户去记录写入数据库。1分钟吧-记录的当前时间-过去时间
    // 核心问题， inputBytes 啥时候开始计算？gost 程序开始？or 监听开始？ 应用程序重启又怎么计算 ？
    //     curl -XPOST http://127.0.0.1:8000/observer \
    // -d '{"events":[
    // {"kind":"service","service":"service-0","type":"stats",
    // "stats":{"totalConns":1,"currentConns":0,"inputBytes":235,"outputBytes":632,"totalErrs":0}}
    // ]}'
    // data.events.forEach((v) => {
    // const totalByte =
    // });
  }
}
