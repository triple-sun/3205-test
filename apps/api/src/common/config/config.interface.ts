import {TConfigSchema} from './config.schema.js';

export interface ConfigInterface {
  get<T extends keyof TConfigSchema>(key: T): TConfigSchema[T];
}
