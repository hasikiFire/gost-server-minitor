import { GatewayService } from './gateway.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [GatewayService],
})
export class GatewayModule {}
