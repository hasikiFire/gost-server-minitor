import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DockerCommand } from './command/docker';
import { setupSwagger } from 'swagger.config';
import { ConfigureService } from './module/configure/configure.service';
import { ReqeustInterceptor } from './common/requestInterceptor';
import { RabbitMQ } from './common/mq';
import { MyLoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(MyLoggerService);
  app.useGlobalInterceptors(new ReqeustInterceptor());
  setupSwagger(app); // 配置 Swagger
  if (!process.env.NODE_ENV?.includes('development')) {
    const dockerCommand = new DockerCommand();
    // 1. 重启 Docker
    dockerCommand.restartDocker();
  }
  // 2. 以最新的数据库数据加载配置
  const configureServiceService = app.get(ConfigureService);
  await configureServiceService.loadConfig();
  await app.listen(30000);
  const mqInstanc = new RabbitMQ(logger);
  mqInstanc.init();
}
bootstrap();
