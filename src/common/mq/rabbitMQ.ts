import { Channel, Connection } from 'amqplib';
import * as amqp from 'amqplib/callback_api';
import { MyLoggerService } from '../logger/logger.service';
import { GatewayService } from 'src/module/gateway/gateway.service';
export class RabbitMQConsumer {
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private readonly queue: string;
  private readonly rabbitmqUrl: string;
  private readonly logger: MyLoggerService; // 添加 Logger 服务
  private readonly exchange = 'gost_server_monitor'; // Fanout 交换机名称
  private readonly gatewayService: GatewayService; // 添加 Logger 服务

  constructor(queue: string, rabbitmqUrl: string, logger: MyLoggerService) {
    this.queue = queue;
    this.rabbitmqUrl = rabbitmqUrl;
    this.logger = logger;
  }

  // 初始化连接和信道
  public async initialize(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.logger.log(['RabbitMQ'], '开始创建mq连接');
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
                  this.handleMqMessage(msg);
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

  // 转发消息的方法，根据方法名动态调用
  async handleMqMessage(payload: IMQMessage) {
    const { method, params } = payload;

    try {
      // 动态调用对应的服务方法
      await this.gatewayService[method](params);
      this.logger.log(
        '[RabbitMQConsumer] handleMqMessage success',
        `method: ${method}, params: ${params}`,
      );
    } catch (error) {
      this.logger.error(
        '[RabbitMQConsumer] handleMqMessage error',
        `method: ${method}, params: ${params}`,
      );
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
