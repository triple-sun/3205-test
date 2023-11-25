import pino, { Logger } from 'pino';
import { injectable } from 'inversify';

import { ILogger } from './logger.interface';
import { InfoMessage } from '@3205-test/common';

@injectable()
export default class LoggerService implements ILogger {
  private logger!: Logger;

  constructor() {
    this.logger = pino({
      transport: { target: 'pino-pretty' },
    });
    this.logger.info(InfoMessage.Logger);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
