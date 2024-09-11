/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { PluginService } from './plugin.service';
import {
  IAuthUser,
  IEventsResponseDTO,
  ILimiterDTO,
} from 'src/DTO/observerDTO';

@Controller('obsever')
export class ObseverController {
  constructor(private readonly pluginService: PluginService) {}

  @Post('observer')
  async observerGost(@Body() data: IEventsResponseDTO) {
    return this.pluginService.observerGost(data);
  }

  @Post('auth')
  async auth(@Body() data: IAuthUser) {
    return this.pluginService.auth(data);
  }

  @Post('limiter')
  async limiter(@Body() data: ILimiterDTO) {
    return this.pluginService.limiter(data);
  }

  // reset cache
  @Post('reset')
  async resetObseverCache(@Body() data: ILimiterDTO) {
    // TODO 重置缓存，每日晚上0点。场景：用户更换套餐，套餐速率不同：limiter
    return this.pluginService.limiter(data);
  }

  // TODO get RabbitMQ ?
  // RabbitMQ
}
