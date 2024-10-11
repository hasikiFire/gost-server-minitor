import { MyLoggerService } from '../logger/logger.service';
import { RabbitMQConfig } from './config';
import { RabbitMQConsumer } from './rabbitMQ';
export class RabbitMQ {
  constructor(
    private readonly logger: MyLoggerService, // 添加 Logger 服务
  ) {}

  async init(): Promise<void> {
    try {
      const rabbitmqUrl = RabbitMQConfig.getRabbitMQUrl();
      const queue = RabbitMQConfig.getQueueName();
      const consumer = new RabbitMQConsumer(queue, rabbitmqUrl, this.logger);
      await consumer.initialize();
      console.log('consumeMessages');
      await consumer.consumeMessages();
    } catch (e) {
      this.logger.error('RabbitMQ init', e);
    }
  }
}
