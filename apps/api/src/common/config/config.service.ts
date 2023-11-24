import { config } from 'dotenv';
import { inject, injectable} from 'inversify';

import { LoggerInterface } from '../logger/logger.interface';
import { ConfigInterface } from './config.interface';
import { configSchema, TConfigSchema } from './config.schema';
import { Component, ErrorMessage, InfoMessage } from '@3205-test/common';

@injectable()

export default class ConfigService implements ConfigInterface {
  private config: TConfigSchema;
  private logger: LoggerInterface;

  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface) {
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
