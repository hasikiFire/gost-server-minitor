import { Module } from '@nestjs/common';
import { AppController } from './docker.controller';
import { AppService } from './docker.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
