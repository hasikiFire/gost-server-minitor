/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { ObseverService } from './obsever.service';
import {
  IAuthUser,
  IEventsResponseDTO,
  ILimiterDTO,
} from 'src/DTO/observerDTO';

@Controller('obsever')
export class ObseverController {
  constructor(private readonly obseverService: ObseverService) {}

  @Post('observer')
  async observerGost(@Body() data: IEventsResponseDTO) {
    return this.obseverService.observerGost(data);
  }

  @Post('auth')
  async auth(@Body() data: IAuthUser) {
    return this.obseverService.auth(data);
  }

  @Post('limiter')
  async limiter(@Body() data: ILimiterDTO) {
    return this.obseverService.limiter(data);
  }

  // TODO get RabbitMQ ?
  // RabbitMQ
}
