/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { UsageRecordService } from './usagerecord.service';
import { User } from 'src/common/entities/User';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PackageItem } from 'src/common/entities/PackageItem';
@ApiTags('usageRecords')
@Controller('usageRecords')
export class UsageRecordController {
  constructor(private readonly usageRecordService: UsageRecordService) {}

  @Get('getUsers')
  @ApiResponse({ status: 0 })
  async getUsers(): Promise<User[]> {
    return this.usageRecordService.findValidUsers();
  }

  @Get('getLimiters')
  async getLimiters(): Promise<PackageItem[]> {
    return this.usageRecordService.findValidPackageitem();
  }
}
