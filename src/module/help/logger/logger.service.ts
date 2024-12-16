// logger.service.ts
import { Injectable, LoggerService } from '@nestjs/common';
import logger from './logger';

@Injectable()
export class MyLoggerService implements LoggerService {
  log(message: any, context?: any) {
    logger.info(this.formatMessage(message, context));
  }

  error(message: any, context?: string, trace?: string) {
    logger.error(this.formatMessage(message, context), trace);
  }

  warn(message: any, context?: string) {
    logger.warn(this.formatMessage(message, context));
  }

  debug(message: any, context?: string) {
    logger.debug(this.formatMessage(message, context));
  }

  verbose(message: any, context?: string) {
    logger.verbose(this.formatMessage(message, context));
  }

  private formatMessage(message: any, context?: string): string {
    return context ? `${message}: ${context}` : message;
  }
}
