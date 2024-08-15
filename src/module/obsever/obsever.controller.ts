/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post } from '@nestjs/common';
import { ObseverService } from './obsever.service';
import { IEventsResponseDTO } from 'src/DTO/observerDTO';

@Controller('obsever')
export class ObseverController {
  constructor(private readonly obseverService: ObseverService) {}
  @Post('observer')
  async listenGost(data: IEventsResponseDTO) {
    return this.obseverService.listenGost(data);
  }
}
