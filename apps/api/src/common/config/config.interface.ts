import {TConfigSchema} from './config.schema.js';

export interface IConfig {
  get<T extends keyof TConfigSchema>(key: T): TConfigSchema[T];
}
