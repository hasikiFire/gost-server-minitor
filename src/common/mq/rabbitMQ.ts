import amqp, { Channel, Connection } from 'amqplib';

export class RabbitMQConsumer {
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private readonly queue: string;
  private readonly rabbitmqUrl: string;

  constructor(queue: string, rabbitmqUrl: string) {
    this.queue = queue;
    this.rabbitmqUrl = rabbitmqUrl;
  }
  public static getRabbitMQUrl(): string {
    const hostname = process.env.MQ_HOSTNAME || 'localhost';
    const port = process.env.MQ_PORT || '5672';
    const user = process.env.MQ_USER || 'guest';
    const password = process.env.MQ_PASSWORD || 'guest';
    const vhost = process.env.MQ_VHOST || '/'; // 默认为根虚拟主机

    return `amqp://${user}:${password}@${hostname}:${port}${vhost !== '/' ? `/${vhost}` : ''}`;
  }

  public static getQueueName(): string {
    return process.env.MQ_QUEUE || 'myQueue'; // 提供默认队列名称
  }

  // 初始化连接和信道
  public async initialize(): Promise<void> {
    try {
      // 创建连接
      this.connection = await amqp.connect(this.rabbitmqUrl);
      console.log('RabbitMQ connection established');

      // 创建信道
      this.channel = await this.connection.createChannel();
      console.log('RabbitMQ channel created');

      // 确保队列存在
      await this.channel.assertQueue(this.queue, { durable: true });
      console.log(`Queue ${this.queue} is ready`);
    } catch (error) {
      console.error('Error initializing RabbitMQ:', error);
      throw error;
    }
  }

  // 消费消息
  public async consumeMessages(): Promise<void> {
    if (!this.channel) {
      throw new Error(
        'Channel is not initialized. Please call initialize() first.',
      );
    }

    try {
      console.log(`Waiting for messages in queue: ${this.queue}`);

      // 消费消息
      this.channel.consume(this.queue, (msg) => {
        if (msg !== null) {
          console.log('Received message:', msg.content.toString());

          // 处理完消息后确认
          this.channel!.ack(msg);
        }
      });
    } catch (error) {
      console.error('Error consuming messages:', error);
    }
  }

  // 关闭连接
  public async closeConnection(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
        console.log('RabbitMQ channel closed');
      }
      if (this.connection) {
        await this.connection.close();
        console.log('RabbitMQ connection closed');
      }
    } catch (error) {
      console.error('Error closing RabbitMQ connection:', error);
    }
  }
}
