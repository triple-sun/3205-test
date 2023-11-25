import { slowDown } from 'express-slow-down';
import { RateLimitRequestHandler, rateLimit } from 'express-rate-limit';
import 'reflect-metadata';
import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import cors from 'cors'

import { ILogger } from '../common/logger/logger.interface';
import { IConfig } from '../common/config/config.interface';
import { IController } from '../common/controller/controller.interface';
import { IExceptionFilter } from '../common/exception-filter/exception-filter.interface';
import {
  Component,
  Env,
  InfoMessage,
  getFullServerPath,
} from '@3205-test/common';

@injectable()
export default class App {
  private expressApp: Express;
  private limiter: RateLimitRequestHandler
  private slower

  constructor(
    @inject(Component.LoggerInterface) private logger: ILogger,
    @inject(Component.ConfigInterface) private config: IConfig,
    @inject(Component.ExceptionFilterInterface)
    private exceptionFilter: IExceptionFilter,
    @inject(Component.UserController)
    private userController: IController
  ) {
    this.expressApp = express();

    this.limiter = rateLimit({
      windowMs: 5000,
      limit: 1
    });

    this.slower = slowDown({
      windowMs: this.config.get('DELAY_MS'),
      delayAfter: 0,
      delayMs: () => this.config.get('DELAY_MS')
  })}

  public initRoutes() {
    this.expressApp.use('/api', this.userController.router);
  }

  public initMiddleware() {
    this.expressApp.use(express.json());
    this.expressApp.use(cors())
    this.expressApp.use(this.limiter)
    this.expressApp.use(this.slower);
  }

  public initExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.logger.info(InfoMessage.AppInit);
    this.logger.info(`${InfoMessage.PortEnv} ${this.config.get(Env.Port)}`);

    this.initMiddleware();
    this.initExceptionFilters();
    this.initRoutes();
    this.expressApp.listen(this.config.get(Env.Port));
    this.logger.info(
      `${InfoMessage.ServerStarted} ${getFullServerPath(
        this.config.get(Env.Host),
        this.config.get(Env.Port)
      )}`
    );
  }
}
