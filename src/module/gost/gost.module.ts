import { Module } from '@nestjs/common';
import { GostController } from './gost.controller';
import { GostService } from './gost.service';
import { ConfigModule } from '@nestjs/config';
import { UsageRecordModule } from '../usageRecord/usagerecord.module';
import { RequestModule } from 'src/common/request/request.module';
@Module({
  imports: [ConfigModule, UsageRecordModule, RequestModule],
  controllers: [GostController],
  providers: [GostService],
})
export class GostModule {}
