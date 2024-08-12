import { ObseverModule } from './module/obsever/obsever.module';
import { ObseverController } from './module/obsever/obsever.controller';
import { ObseverService } from './module/obsever/obsever.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageRecordModule } from './module/usageRecord/usagerecord.module';
import { GostService } from './module/gost/gost.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule,
    ObseverModule,
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV}`, // 根据 NODE_ENV 环境变量加载相应的 .env 文件
        '.env', // 加载 .env 文件作为默认配置
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsageRecordModule,
  ],
  controllers: [ObseverController],
  providers: [ObseverService, GostService],
})
export class AppModule {}
