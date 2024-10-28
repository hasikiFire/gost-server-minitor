import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/config/swagger/swagger.config';
import { ConfigureService } from 'src/module/configure/configure.service';
import { ReqeustInterceptor } from 'src/common/requestInterceptor';
import { RabbitMQ } from 'src/common/mq';
import { MyLoggerService } from 'src/common/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { RedisInstanceService } from './module/redis/redis.service';
import { GatewayService } from './module/gateway/gateway.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(MyLoggerService);
  const config = app.get(ConfigService);
  const redisInstanceService = app.get(RedisInstanceService);
  const gatewayService = app.get(GatewayService);
  app.useGlobalInterceptors(new ReqeustInterceptor());
  setupSwagger(app); // 配置 Swagger
  // 2. 以最新的数据库数据加载配置
  const configureService = app.get(ConfigureService);
  await configureService.loadConfig();
  await app.listen(process.env.APP_PORT);
  const mqInstanc = new RabbitMQ(
    config,
    logger,
    redisInstanceService,
    gatewayService,
  );
  mqInstanc.init();
}
bootstrap();
