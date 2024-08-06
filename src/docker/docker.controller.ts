import { Controller } from '@nestjs/common';
import { DockerService } from './docker.service';

@Controller()
export class DockerController {
  constructor(private readonly appService: DockerService) {}
}
