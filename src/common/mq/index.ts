import { ConfigService } from '@nestjs/config';
import { MyLoggerService } from '../logger/logger.service';
import { RabbitMQConsumer } from './rabbitMQ';
export class RabbitMQ {
  constructor(
    private readonly logger: MyLoggerService, // 添加 Logger 服务
    private readonly configService: ConfigService,
  ) {}

  async init(): Promise<void> {
    try {
      const rabbitmqUrl = this.getRabbitMQUrl();
      const queue = this.getQueueName();
      const consumer = new RabbitMQConsumer(queue, rabbitmqUrl, this.logger);
      await consumer.initialize();
    } catch (e) {
      this.logger.error('RabbitMQ init', e);
    }
  }

  public getRabbitMQUrl(): string {
    const hostname =
      this.configService.get<string>('mq.hostname') || 'localhost';
    const port = this.configService.get<string>('mq.port') || '5672';
    const user = this.configService.get<string>('mq.user') || 'guest';
    const password = this.configService.get<string>('mq.password') || 'guest';
    const vhost = '/'; // 默认为根虚拟主机
    const url = `amqp://${user}:${password}@${hostname}:${port}${vhost !== '/' ? `/${vhost}` : ''}`;

    return url;
  }

  public getQueueName(): string {
    return process.env.MQ_QUEUE || 'gostApiQueue'; // 提供默认队列名称
  }
}
