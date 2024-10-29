/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { PluginService } from './plugin.service';
import {
  IAuthUser,
  IEventsResponseDTO,
  ILimiterDTO,
} from 'src/common/dto/observerDTO';

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

  @Post('reset')
  async resetObseverCache(@Body() data: ILimiterDTO) {
    return this.pluginService.limiter(data);
  }
}
