/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { PluginService } from './plugin.service';
import {
  IAuthUser,
  IEventsResponseDTO,
  ILimiterDTO,
} from 'src/common/DTO/observerDTO';

@Controller('plugin')
export class PluginController {
  constructor(private readonly pluginService: PluginService) {}

  @Post('observeUser')
  async observeUser(@Body() data: IEventsResponseDTO) {
    return this.pluginService.observeUser(data);
  }
  @Post('observeService')
  async observeService(@Body() data: IEventsResponseDTO) {
    return this.pluginService.observeService(data);
  }

  @Post('auther')
  async auth(@Body() data: IAuthUser) {
    return this.pluginService.auther(data);
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
