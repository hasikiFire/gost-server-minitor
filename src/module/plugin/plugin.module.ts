/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ObseverController } from './plugin.controller';
import { PluginService } from './plugin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageRecord } from 'src/common/entities/UsageRecord';
import { User } from 'src/common/entities/User';
import { RabbitMQModule } from '../help/rabbitMQ/rabbitmq.module';
import { ForeignServer } from 'src/common/entities/ForeignServer';
import { UsageRecordModule } from '../usageRecord/usagerecord.module';
import { ServerModule } from '../server/server.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([UsageRecord, User, ForeignServer]),
    RabbitMQModule,
    UsageRecordModule,
    ServerModule,
  ],
  controllers: [ObseverController],
  providers: [PluginService],
})
export class PluginModule {}
