import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
