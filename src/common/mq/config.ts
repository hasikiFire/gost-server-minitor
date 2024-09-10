export class RabbitMQConfig {
  public static getRabbitMQUrl(): string {
    const hostname = process.env.MQ_HOSTNAME || 'localhost';
    const port = process.env.MQ_PORT || '5672';
    const user = process.env.MQ_USER || 'guest';
    const password = process.env.MQ_PASSWORD || 'guest';
    const vhost = process.env.MQ_VHOST || '/'; // 默认为根虚拟主机
    const url = `amqp://${user}:${password}@${hostname}:${port}${vhost !== '/' ? `/${vhost}` : ''}`;

    return url;
  }

  public static getQueueName(): string {
    return process.env.MQ_QUEUE || 'gostApiQueue'; // 提供默认队列名称
  }
}
