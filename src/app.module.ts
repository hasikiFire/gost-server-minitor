import { ServerModule } from './module/server/server.module';
import { LoggerModule } from './module/help/logger/logger.module';
import { RequestModule } from './module/help/request/request.module';
import { PluginModule } from './module/plugin/plugin.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsageRecordModule } from './module/usageRecord/usagerecord.module';
// import { GostService } from './module/gost/gost.service';
import { HttpModule } from '@nestjs/axios';
// import { UsageRecordService } from './module/usageRecord/usagerecord.service';
// import { GostController } from './module/gost/gost.controller';
// import { UsageRecordController } from './module/usageRecord/usagerecord.controller';
// import { GostModule } from './module/deprecated/configure/configure.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ReqeustInterceptor } from './common/interceptor/requestInterceptor';
import { MyLoggerService } from './module/help/logger/logger.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { GatewayModule } from './module/gateway/gateway.module';
import configuration from './config/index';
import { ConfigureModule } from './module/configure/configure.module';
import { RedisModule } from './module/help/redis/redis.module';
import { RabbitMQModule } from './module/help/rabbitMQ/rabbitmq.module';

import { ScheduleModule } from '@nestjs/schedule';
import { StatusInterceptor } from './common/interceptor/statusInterceptor';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServerModule,
    RabbitMQModule,
    GatewayModule,
    LoggerModule,
    RequestModule,
    ConfigureModule,
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          ...config.get('database'),
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          autoLoadEntities: true,
        } as TypeOrmModuleOptions;
      },
      // logging: true, // 启用日志记录
    }),
    RedisModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          return {
            closeClient: true,
            readyLog: true,
            errorLog: true,
            config: config.get('redis'),
          };
        },
      },
      true,
    ),
    HttpModule,
    PluginModule,
    UsageRecordModule,
    RequestModule,
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  providers: [
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
    {
      provide: APP_INTERCEPTOR,
      useClass: StatusInterceptor, // 注册为全局拦截器
    },
  ],
})
export class AppModule {}
