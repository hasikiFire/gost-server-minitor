import { Channel, Connection } from 'amqplib';
import * as amqp from 'amqplib/callback_api';
import { MyLoggerService } from '../logger/logger.service';
export class RabbitMQConsumer {
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private readonly queue: string;
  private readonly rabbitmqUrl: string;
  private readonly logger: MyLoggerService; // 添加 Logger 服务
  private readonly exchange = 'gost_server_monitor'; // Fanout 交换机名称

  constructor(queue: string, rabbitmqUrl: string, logger: MyLoggerService) {
    this.queue = queue;
    this.rabbitmqUrl = rabbitmqUrl;
    this.logger = logger;
  }

  // 初始化连接和信道
  public async initialize(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        // 创建连接
        amqp.connect(this.rabbitmqUrl, async (error0, connection) => {
          if (error0 || !connection) {
            reject(error0 || '创建mq连接失败');
          }
          this.connection = connection;

          connection.createChannel(async (error1, channel) => {
            if (error1) {
              reject(error1);
            }
            this.logger.log(['RabbitMQ'], '创建mq连接成功');
            this.channel = channel;

            await channel.assertExchange(this.exchange, 'fanout', {
              durable: true,
            });
            const q = await channel.assertQueue(this.queue, {
              durable: true,
            });
            this.logger.log(['RabbitMQ'], `队列 ${this.queue} 准备完成`);
            // 将队列绑定到 Fanout 交换机
            await channel.bindQueue(q.queue, this.exchange, '');

            channel.consume(
              q.queue,
              (msg) => {
                console.log('msg: ', msg);
                if (msg !== null) {
                  // 注意异步处理消息
                  this.logger.log(
                    ['RabbitMQ'],
                    `收到消息: ${msg.content.toString()}`,
                  );
                  channel.ack(msg); // 确认收到消息
                }
              },
              {
                noAck: false, // 开启消息确认机制
              },
            );

            resolve(true);
          });
        });
      } catch (error) {
        console.error('Error initializing RabbitMQ:', error);
        reject(false);
      }
    });
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
