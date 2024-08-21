/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { ObseverService } from './obsever.service';
import { IAuthUser, IEventsResponseDTO } from 'src/DTO/observerDTO';

@Controller('obsever')
export class ObseverController {
  constructor(private readonly obseverService: ObseverService) {}

  @Post('observer')
  async listenGost(@Body() data: IEventsResponseDTO) {
    return this.obseverService.listenGost(data);
  }

  @Post('auth')
  async checkUser(@Body() data: IAuthUser) {
    return this.obseverService.checkUser(data);
  }
}
