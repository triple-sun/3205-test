export enum Doc {
  Host = 'Service host',
  Port = 'Port for incoming connections',
  Delay = 'Request execution delay',
  MockCount = 'Mock users count',
  DbPath = 'JSON db file path',
  TestEmail = 'Default test user email',
  TestNumber = 'Default test user number'
}

export enum Env {
  Host = 'HOST',
  Port = 'PORT',
  Delay = 'THROTTLE_MS',
  MockCount = 'MOCK_COUNT',
  DbPath = 'DB_PATH',
  TestEmail = 'TEST_EMAIL',
  TestNumber = 'TEST_NUMBER'
}

export enum Format {
  Port = 'port',
  IP = 'ipaddress',
  Delay = 'int',
  MockCount = 'int',
  DbPath = 'String',
  TestEmail = 'email',
  TestNumber = 'int'
}

