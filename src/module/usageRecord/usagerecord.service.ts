/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsageRecord } from 'src/entities/UsageRecord';
import { User } from 'src/entities/User';
import { In, Repository } from 'typeorm';

@Injectable()
export class UsageRecordService {
  constructor(
    @InjectRepository(UsageRecord)
    private readonly UsageRecordRepository: Repository<UsageRecord>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findValidUsers(): Promise<User[]> {
    const record = await this.UsageRecordRepository.find({
      where: { purchaseStatus: In([0, 1]) },
    });
    if (record.length) {
      const tempIds = record.map((v) => v.userId);
      const userids = Array.from(new Set(tempIds));
      console.log('userids: ', userids);
      const users = await this.userRepository.find({
        where: {
          id: In(userids),
        },
      });
      return users;
    }
    return [];
  }
}
