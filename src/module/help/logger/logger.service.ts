// logger.service.ts
import { Injectable, LoggerService } from '@nestjs/common';
import logger from './logger';

@Injectable()
export class MyLoggerService implements LoggerService {
  log(message: any, ...context: any[]) {
    logger.info(this.formatMessage(message, context));
  }

  error(message: any, ...context: any[]) {
    logger.error(this.formatMessage(message, context));
  }

  warn(message: any, ...context: any[]) {
    logger.warn(this.formatMessage(message, context));
  }

  debug(message: any, ...context: any[]) {
    logger.debug(this.formatMessage(message, context));
  }

  verbose(message: any, ...context: any[]) {
    logger.verbose(this.formatMessage(message, context));
  }

  private formatMessage(message: any, ...context: any[]): string {
    // 如果 context 中有多个参数，逐个转为字符串并拼接
    const contextStr = context.map((item) => JSON.stringify(item)).join(' ');
    return contextStr ? `${message}: ${contextStr}` : message;
  }
}
