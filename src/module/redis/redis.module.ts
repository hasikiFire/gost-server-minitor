import {
  RedisModule as liaoliaoRedisModule,
  RedisModuleAsyncOptions,
} from '@liaoliaots/nestjs-redis';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { RedisInstanceService } from './redis.service';

@Global()
@Module({
  providers: [RedisInstanceService],
  exports: [RedisInstanceService],
})
export class RedisModule {
  static forRoot(
    options: RedisModuleAsyncOptions,
    isGlobal = true,
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [liaoliaoRedisModule.forRootAsync(options, isGlobal)],
      providers: [RedisInstanceService],
      exports: [RedisInstanceService],
    };
  }

  static forRootAsync(
    options: RedisModuleAsyncOptions,
    isGlobal = true,
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [liaoliaoRedisModule.forRootAsync(options, isGlobal)],
      providers: [RedisInstanceService],
      exports: [RedisInstanceService],
    };
  }
}
