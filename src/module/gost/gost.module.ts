import { Module } from '@nestjs/common';
import { GostController } from './gost.controller';
import { GostService } from './gost.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageRecordController } from '../usageRecord/usagerecord.controller';
import { UsageRecordService } from '../usageRecord/usagerecord.service';
@Module({
  imports: [ConfigModule, TypeOrmModule],
  controllers: [GostController, UsageRecordController],
  providers: [GostService, UsageRecordService],
})
export class AppModule {}
