/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ObseverController } from './plugin.controller';
import { PluginService } from './plugin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageRecord } from 'src/common/entities/UsageRecord';
import { User } from 'src/common/entities/User';
import { RabbitMQModule } from '../rabbitMQ/rabbitmq.module';
@Module({
  imports: [TypeOrmModule.forFeature([UsageRecord, User]), RabbitMQModule],
  controllers: [ObseverController],
  providers: [PluginService],
})
export class ObseverModule {}
