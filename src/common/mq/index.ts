import { RabbitMQConfig } from './config';
import { RabbitMQConsumer } from './rabbitMQ';

export async function initRabbitMQ(): Promise<void> {
  const rabbitmqUrl = RabbitMQConfig.getRabbitMQUrl();
  const queue = RabbitMQConfig.getQueueName();
  const consumer = new RabbitMQConsumer(queue, rabbitmqUrl);
  await consumer.initialize();
  await consumer.consumeMessages();
}
