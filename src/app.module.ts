import { TransferModule } from './module/transfer/transfer.module';
import { MqModule } from './module/mq/mq.module';
import { MqService } from './module/mq/mq.service';
import { LoggerModule } from './common/logger/logger.module';
import { RequestModule } from './common/request/request.module';
import { ObseverModule } from './module/plugin/plugin.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageRecordModule } from './module/usageRecord/usagerecord.module';
// import { GostService } from './module/gost/gost.service';
import { HttpModule } from '@nestjs/axios';
// import { UsageRecordService } from './module/usageRecord/usagerecord.service';
// import { GostController } from './module/gost/gost.controller';
// import { UsageRecordController } from './module/usageRecord/usagerecord.controller';
import { GostModule } from './module/configure/configure.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ReqeustInterceptor } from './common/requestInterceptor';
import { MyLoggerService } from './common/logger/logger.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TransferModule,
    MqModule,
    LoggerModule,
    RequestModule,
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
      // logging: true, // 启用日志记录
    }),
    HttpModule,
    ObseverModule,
    UsageRecordModule,
    GostModule,
    RequestModule,
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  // controllers: [UsageRecordController, GostController],
  providers: [
    MqService,
    MyLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MyLoggerService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ReqeustInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
