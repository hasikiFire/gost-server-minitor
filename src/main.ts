import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/config/swagger/swagger.config';
import { ConfigureService } from 'src/module/configure/configure.service';
import { ReqeustInterceptor } from 'src/common/interceptor/requestInterceptor';
import networkInfo from './common/os/NetworkInfo';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ReqeustInterceptor());
  setupSwagger(app); // 配置 Swagger
  // 2. 以最新的数据库数据加载配置
  const configureService = app.get(ConfigureService);
  await configureService.loadConfig();
  const nInfo = await networkInfo.getIPAddresses();
  console.log('nInfo: ', nInfo);
  await app.listen(process.env.APP_PORT);
}
bootstrap();
