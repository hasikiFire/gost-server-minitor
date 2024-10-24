/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageRecordController } from './usagerecord.controller';
import { UsageRecordService } from './usagerecord.service';
import { User } from 'src/common/entities/User';
import { UsageRecord } from 'src/common/entities/UsageRecord';
import { PackageItem } from 'src/common/entities/PackageItem';

@Module({
  imports: [TypeOrmModule.forFeature([UsageRecord, User, PackageItem])],
  controllers: [UsageRecordController],
  providers: [UsageRecordService],
  exports: [UsageRecordService], // 确保服务被导出
})
export class UsageRecordModule {}
