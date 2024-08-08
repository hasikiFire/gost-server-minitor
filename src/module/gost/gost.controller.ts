import { Controller } from '@nestjs/common';
import { GostService } from './gost.service';

@Controller()
export class GostController {
  constructor(private readonly gostService: GostService) {}
}
