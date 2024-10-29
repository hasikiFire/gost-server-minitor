/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageItem } from 'src/common/entities/PackageItem';
import { UsageRecord } from 'src/common/entities/UsageRecord';
import { User } from 'src/common/entities/User';
import { In, Repository } from 'typeorm';

@Injectable()
export class UsageRecordService {
  constructor(
    @InjectRepository(UsageRecord)
    private readonly usageRecordRepository: Repository<UsageRecord>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PackageItem)
    private readonly packageItemRepository: Repository<PackageItem>,
  ) {}

  async findValidUsers(): Promise<User[]> {
    const record = await this.usageRecordRepository.find({
      where: { purchaseStatus: In([0, 1]) },
    });
    if (record.length) {
      const tempIds = record.map((v) => v.userId);
      const userids = Array.from(new Set(tempIds));
      const users = await this.userRepository.find({
        where: {
          id: In(userids),
        },
      });

      return users;
    }
    return [];
  }

  async findValidPackageitem(): Promise<PackageItem[]> {
    const record = await this.packageItemRepository.find({
      where: { packageStatus: 1, deleted: 0 },
    });
    if (record.length) {
      return record.filter((v) => v.speedLimit);
    }
    return [];
  }
}
