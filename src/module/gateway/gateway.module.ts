import { GatewayService } from './gateway.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [GatewayService],
  exports: [GatewayService],
})
export class GatewayModule {}
