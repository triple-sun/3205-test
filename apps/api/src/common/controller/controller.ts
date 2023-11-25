import expressAsyncHandler from 'express-async-handler';
import { injectable } from 'inversify';
import { Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IController } from './controller.interface';
import { InfoMessage, RouteInterface } from '@3205-test/common';
import { ILogger } from '../logger/logger.interface';
import { IConfig } from '../config/config.interface';


@injectable()
export abstract class Controller implements IController {
  private readonly _router: Router;

  constructor(
    protected readonly logger: ILogger,
    protected readonly configService: IConfig
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: RouteInterface) {
    const routeHandler = expressAsyncHandler(route.handler.bind(this));
    const middlewares = route.middlewares?.map((middleware) =>
      expressAsyncHandler(middleware.execute.bind(middleware))
    );

    const allHandlers = middlewares
      ? [...middlewares, routeHandler]
      : routeHandler;

    this._router[route.method](route.path, allHandlers);

    this.logger.info(
      `${InfoMessage.Route} ${route.method.toUpperCase()} ${route.path}`
    );
  }

  public send<T>(res: Response, statusCode: number, data?: T): void {
    res.type('application/json').status(statusCode).json(data);
  }

  public notFound<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NOT_FOUND, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
