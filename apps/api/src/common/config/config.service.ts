import { config } from 'dotenv';
import { inject, injectable} from 'inversify';

import { ILogger } from '../logger/logger.interface';
import { IConfig } from './config.interface';
import { configSchema, TConfigSchema } from './config.schema';
import { Component, ErrorMessage, InfoMessage } from '@3205-test/common';

@injectable()
export default class ConfigService implements IConfig {
  private config: TConfigSchema;
  private logger: ILogger;

  constructor(@inject(Component.LoggerInterface) logger: ILogger) {
    this.logger = logger;

    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error(ErrorMessage.Env);
    }

    configSchema.load({});
    configSchema.validate({allowed: 'strict', output: this.logger.info});

    this.config = configSchema.getProperties();
    this.logger.info(InfoMessage.EnvSuccess);
  }

  public get<T extends keyof TConfigSchema>(key: T) {
    return this.config[key];
  }
}
