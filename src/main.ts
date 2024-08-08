import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DockerCommand } from './command/docker';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(9000);

  if (!process.env.NODE_ENV?.includes('development')) {
    const dockerCommand = new DockerCommand();
    dockerCommand.startDockerCompose();
  }
}
bootstrap();
