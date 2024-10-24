/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ObseverController } from './plugin.controller';
import { PluginService } from './plugin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageRecord } from 'src/common/entities/UsageRecord';
import { User } from 'src/common/entities/User';
@Module({
  imports: [TypeOrmModule.forFeature([UsageRecord, User])],
  controllers: [ObseverController],
  providers: [PluginService],
})
export class ObseverModule {}
