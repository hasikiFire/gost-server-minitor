/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { UsageRecordService } from './usagerecord.service';
import { User } from 'src/entities/User';

@Controller('usageRecords')
export class UsageRecordController {
  constructor(private readonly usageRecordService: UsageRecordService) {}

  @Get('validUsers')
  async findValidUsers(): Promise<User[]> {
    return this.usageRecordService.findValidUsers();
  }
}
