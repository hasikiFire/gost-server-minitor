import { LoggerModule } from './common/logger/logger.module';
import { RequestModule } from './common/request/request.module';
import { ObseverModule } from './module/plugin/plugin.module';
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
import { ReqeustInterceptor } from './common/requestInterceptor';
import { MyLoggerService } from './common/logger/logger.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { GatewayModule } from './module/gateway/gateway.module';
import configuration from './config/index';
import { ConfigureModule } from './module/configure/configure.module';
import { RedisModule } from './module/redis/redis.module';
@Module({
  imports: [
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
          autoLoadEntities: true,
          synchronize: true,
        } as TypeOrmModuleOptions;
      },
      // logging: true, // 启用日志记录
    }),
    // redis
    RedisModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          console.log('config.ge  ', config.get('redis'));
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
    ObseverModule,
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
  ],
})
export class AppModule {}
