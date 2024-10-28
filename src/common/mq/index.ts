import { ConfigService } from '@nestjs/config';
import { RedisInstanceService } from 'src/module/redis/redis.service';

import { Channel, Connection } from 'amqplib';
import * as amqp from 'amqplib/callback_api';
import { MyLoggerService } from '../logger/logger.service';
import { GatewayService } from 'src/module/gateway/gateway.service';
import { RedisCache } from '../constanst';
export class RabbitMQ {
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private queue: string;
  private rabbitmqUrl: string;
  private readonly logger: MyLoggerService; // 添加 Logger 服务
  private readonly exchange = 'gost_server_monitor'; // Fanout 交换机名称
  private readonly gatewayService: GatewayService; // 添加 Logger 服务
  private readonly redisInstanceService: RedisInstanceService;
  private readonly configService: ConfigService;
  constructor(
    configService: ConfigService,
    logger: MyLoggerService,
    redisInstanceService: RedisInstanceService,
    gatewayService: GatewayService,
  ) {
    this.logger = logger;
    this.redisInstanceService = redisInstanceService;
    this.gatewayService = gatewayService;
    this.configService = configService;
  }
  async init(): Promise<void> {
    try {
      this.rabbitmqUrl = this.getRabbitMQUrl();
      this.queue = this.getQueueName();
      this.initialize();
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
    return process.env.MQ_QUEUE || 'gost_api_queue'; // 提供默认队列名称
  }

  // 初始化连接和信道
  public async initialize(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.logger.log('[RabbitMQ]', '开始创建mq连接');
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
            this.logger.log('[RabbitMQ]', '创建mq连接成功');
            this.channel = channel;

            await channel.assertExchange(this.exchange, 'fanout', {
              durable: true,
            });
            const q = await channel.assertQueue(this.queue, {
              durable: true,
            });
            this.logger.log('[RabbitMQ]', `队列 ${this.queue} 准备完成`);
            // 将队列绑定到 Fanout 交换机
            await channel.bindQueue(q.queue, this.exchange, '');

            channel.consume(
              q.queue,
              async (msg) => {
                // console.log('msg: ', msg);
                if (msg !== null) {
                  const headers = msg.properties.headers;
                  const apiKey = headers['x-api-key'];
                  const isValid = await this.isValidApiKey(apiKey);
                  if (isValid) {
                    // API key 校验函数
                    this.logger.log(
                      '[RabbitMQ]',
                      `收到消息: ${msg.content.toString()}`,
                    );
                    try {
                      const message = JSON.parse(msg.content.toString());
                      this.handleMqMessage(message);
                      channel.ack(msg); // 确认收到消息
                    } catch (error) {
                      this.logger.error(
                        '[RabbitMQ]',
                        `消息解析失败: ${error.message}`,
                      );
                    }
                  } else {
                    this.logger.error('[RabbitMQ]', `无效的 API key`);
                    channel.nack(msg, false, false); // 拒绝无效的消息
                  }
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
      this.logger.log(
        '[RabbitMQ] handleMqMessage start',
        `method: ${method}, params: ${JSON.stringify(params)}`,
      );

      // 动态调用对应的服务方法
      this.gatewayService.handleRequest(method, params);
    } catch (error) {
      this.logger.error(
        '[RabbitMQ] handleMqMessage error',
        `method: ${method}, params: ${JSON.stringify(params)}`,
        error,
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

  private async isValidApiKey(apiKey: string): Promise<boolean> {
    // const getAllKeysAndValues =
    //   await this.redisInstanceService.getAllKeysAndValues();
    // console.log(' redis getAllKeysAndValues: ', getAllKeysAndValues);

    const key = await this.redisInstanceService.get(
      RedisCache.GOST_SERVER_API_KEY,
    );
    if (key === apiKey) return true;
    // 在这里实现你的 API key 校验逻辑
    return false;
  }
}
