export enum ErrorMessage {
  Fetch = "Can't fetch data from",
  Env = "Can't read .env file. Perhaps the file does not exist.",
  File = "Can't read the file:",
  NotValidEmail = 'is not a valid email',
  NotValidNumber = 'is not a valid number',
  NotFoundUser = 'User not found',
  RequiredEmail = 'An email is required',
  DBBusy = 'Only one simultaneous request is allowed',
  Validation = 'Validation error:',
}

export enum InfoMessage {
  AppInit = 'Application initialization…',
  EnvSuccess = '.env file found and successfully parsed!',
  Logger = 'Logger created…',
  Filter = 'Registered Exception Filter',
  Route = 'Route registered:',
  PortEnv = 'Get value from env $PORT:',
  ServerStarted = 'Server started on',
  UserController = 'Registering routes for UserController…',
}

export enum ErrorType {
  Validation = 'VALIDATION_ERROR',
  Common = 'COMMON_ERROR',
  Service = 'SERVICE_ERROR',
}
