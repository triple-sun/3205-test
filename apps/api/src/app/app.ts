import 'reflect-metadata';
import cors from 'cors';
import express, { Express } from 'express';
import { inject, injectable } from 'inversify';

import { LoggerInterface } from '../common/logger/logger.interface';
import { ConfigInterface } from '../common/config/config.interface';
import { ControllerInterface } from '../common/controller/controller.interface';
import { ExceptionFilterInterface } from '../common/exception-filter/exception-filter.interface';
import {
  Component,
  Env,
  InfoMessage,
  getFullServerPath,
} from '@3205-test/common';

@injectable()
export default class App {
  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.ExceptionFilterInterface)
    private exceptionFilter: ExceptionFilterInterface,
    @inject(Component.UserController)
    private userController: ControllerInterface
  ) {
    this.expressApp = express();
  }

  public initRoutes() {
    this.expressApp.use('/api', this.userController.router);
  }

  public initMiddleware() {
    this.expressApp.use(express.json());
    this.expressApp.use(cors());
  }

  public initExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.logger.info(InfoMessage.AppInit);
    this.logger.info(`${InfoMessage.PortEnv} ${this.config.get(Env.Port)}`);

    this.initRoutes();
    this.initMiddleware();
    this.initExceptionFilters();
    this.expressApp.listen(this.config.get(Env.Port));
    this.logger.info(
      `${InfoMessage.ServerStarted} ${getFullServerPath(
        this.config.get(Env.Host),
        this.config.get(Env.Port)
      )}`
    );
  }
}
