import convict from 'convict';
import validator from 'convict-format-with-validator';

import {
  CONFIG_HOST_DEFAULT,
  CONFIG_PORT_DEFAULT,
  DB_PATH_DEFAULT,
  Doc,
  Env,
  Format,
  MOCK_COUNT_DEFAULT,
  TEST_EMAIL_DEFAULT,
  TEST_NUMBER_DEFAULT,
  THROTTLE_MS_DEFAULT,
} from '@3205-test/common';

convict.addFormats(validator);

export type TConfigSchema = {
  HOST: string;
  PORT: number;
  THROTTLE_MS: number;
  MOCK_COUNT: number;
  DB_PATH: string;
  TEST_EMAIL: string;
  TEST_NUMBER: number;
};

export const configSchema = convict<TConfigSchema>({
  HOST: {
    doc: Doc.Host,
    format: String,
    env: Env.Host,
    default: CONFIG_HOST_DEFAULT,
  },
  PORT: {
    doc: Doc.Port,
    format: Format.Port,
    env: Env.Port,
    default: CONFIG_PORT_DEFAULT,
  },
  THROTTLE_MS: {
    doc: Doc.Throttle,
    format: Format.Throttle,
    env: Env.Throttle,
    default: THROTTLE_MS_DEFAULT,
  },
  MOCK_COUNT: {
    doc: Doc.MockCount,
    format: Format.MockCount,
    env: Env.MockCount,
    default: MOCK_COUNT_DEFAULT,
  },
  DB_PATH: {
    doc: Doc.DbPath,
    format: Format.DbPath,
    env: Env.DbPath,
    default: DB_PATH_DEFAULT,
  },
  TEST_EMAIL: {
    doc: Doc.TestEmail,
    format: Format.TestEmail,
    env: Env.TestEmail,
    default: TEST_EMAIL_DEFAULT,
  },
  TEST_NUMBER: {
    doc: Doc.TestNumber,
    format: Format.TestNumber,
    env: Env.TestNumber,
    default: TEST_NUMBER_DEFAULT,
  },
});
