import 'reflect-metadata';
import { Container } from 'inversify';

import App from './app/app';
import LoggerService from './common/logger/logger.service';
import ConfigService from './common/config/config.service';
import ExceptionFilter from './common/exception-filter/exception-filter';
import UserService from './modules/user/user.service';
import UserController from './modules/user/user.controller';

import { LoggerInterface } from './common/logger/logger.interface';
import { ConfigInterface } from './common/config/config.interface';

import { UserServiceInterface } from './modules/user/user-service.interface';
import { ControllerInterface } from './common/controller/controller.interface';
import { ExceptionFilterInterface } from './common/exception-filter/exception-filter.interface';
import { Component } from '@3205-test/common';

const appContainer = new Container();

appContainer.bind<App>(Component.App).to(App).inSingletonScope();

appContainer
  .bind<LoggerInterface>(Component.LoggerInterface)
  .to(LoggerService)
  .inSingletonScope();
appContainer
  .bind<ConfigInterface>(Component.ConfigInterface)
  .to(ConfigService)
  .inSingletonScope();
appContainer
  .bind<ExceptionFilterInterface>(Component.ExceptionFilterInterface)
  .to(ExceptionFilter)
  .inSingletonScope();

appContainer
  .bind<UserServiceInterface>(Component.UserServiceInterface)
  .to(UserService);
appContainer
  .bind<ControllerInterface>(Component.UserController)
  .to(UserController)
  .inSingletonScope();

const app = appContainer.get<App>(Component.App);

await app.init();
