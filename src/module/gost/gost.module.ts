import { Module } from '@nestjs/common';
import { GostController } from './gost.controller';
import { GostService } from './gost.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [ConfigModule, TypeOrmModule],
  controllers: [GostController],
  providers: [GostService],
})
export class AppModule {}
