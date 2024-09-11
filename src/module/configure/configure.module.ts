import { Module } from '@nestjs/common';
import { ConfigureService } from './configure.service';
import { ConfigModule } from '@nestjs/config';
import { UsageRecordModule } from '../usageRecord/usagerecord.module';
import { RequestModule } from 'src/common/request/request.module';
@Module({
  imports: [ConfigModule, UsageRecordModule, RequestModule],
  controllers: [],
  providers: [ConfigureService],
})
export class GostModule {}
