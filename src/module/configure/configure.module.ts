import { Module } from '@nestjs/common';
import { ConfigureService } from './configure.service';
import { ConfigModule } from '@nestjs/config';
import { RequestModule } from 'src/module/help/request/request.module';
import { UsageRecordModule } from '../usageRecord/usagerecord.module';
@Module({
  imports: [ConfigModule, UsageRecordModule, RequestModule],
  controllers: [],
  providers: [ConfigureService],
})
export class ConfigureModule {}
