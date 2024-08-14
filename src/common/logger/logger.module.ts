// logger.module.ts
import { Global, Module } from '@nestjs/common';
import { MyLoggerService } from './logger.service';

@Global()
@Module({
  providers: [MyLoggerService],
  exports: [MyLoggerService], // 导出服务以便其他模块使用
})
export class LoggerModule {}
