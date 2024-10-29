/*
https://docs.nestjs.com/modules
*/

import { Global, Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { GatewayModule } from 'src/module/gateway/gateway.module';

@Global()
@Module({
  imports: [GatewayModule],

  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
