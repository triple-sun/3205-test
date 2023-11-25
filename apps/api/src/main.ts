import 'reflect-metadata';
import { Container } from 'inversify';

import App from './app/app';
import LoggerService from './common/logger/logger.service';
import ConfigService from './common/config/config.service';
import ExceptionFilter from './common/exception-filter/exception-filter';
import UserService from './modules/user/user.service';
import UserController from './modules/user/user.controller';

import { ILogger } from './common/logger/logger.interface';
import { IConfig } from './common/config/config.interface';

import { IUserService } from './modules/user/user-service.interface';
import { IController } from './common/controller/controller.interface';
import { IExceptionFilter } from './common/exception-filter/exception-filter.interface';
import { Component } from '@3205-test/common';

const appContainer = new Container();

appContainer.bind<App>(Component.App).to(App).inSingletonScope();

appContainer
  .bind<ILogger>(Component.LoggerInterface)
  .to(LoggerService)
  .inSingletonScope();
appContainer
  .bind<IConfig>(Component.ConfigInterface)
  .to(ConfigService)
  .inSingletonScope();
appContainer
  .bind<IExceptionFilter>(Component.ExceptionFilterInterface)
  .to(ExceptionFilter)
  .inSingletonScope();

appContainer
  .bind<IUserService>(Component.UserServiceInterface)
  .to(UserService);
appContainer
  .bind<IController>(Component.UserController)
  .to(UserController)
  .inSingletonScope();

const app = appContainer.get<App>(Component.App);

await app.init();
