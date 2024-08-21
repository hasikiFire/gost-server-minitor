/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ObseverController } from './obsever.controller';
import { ObseverService } from './obsever.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageRecord } from 'src/entities/UsageRecord';
import { User } from 'src/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([UsageRecord, User])],
  controllers: [ObseverController],
  providers: [ObseverService],
})
export class ObseverModule {}
