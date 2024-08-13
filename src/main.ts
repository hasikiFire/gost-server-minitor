import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DockerCommand } from './command/docker';
import { setupSwagger } from 'swagger.config';
import { GostService } from './module/gost/gost.service';
import { ReqeustInterceptor } from './common/requestInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ReqeustInterceptor());
  setupSwagger(app); // 配置 Swagger
  if (!process.env.NODE_ENV?.includes('development')) {
    const dockerCommand = new DockerCommand();
    // 1. 重启 Docker
    dockerCommand.restartDocker();
  }
  const configurationService = app.get(GostService);
  // 2. 以最新的数据库数据加载配置
  await configurationService.loadConfig();

  await app.listen(9000);
}
bootstrap();
