import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DockerCommand } from './command/docker';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(9000);

  const dockerCommand = new DockerCommand();
  dockerCommand.startDockerCompose();
}
bootstrap();
