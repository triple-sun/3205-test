import { RouteInterface } from '@3205-test/common';
import {Response, Router} from 'express';

export interface IController {
  readonly router: Router;
  addRoute(route: RouteInterface): void;
  send<T>(res: Response, statusCode: number, data: T): void;
  ok<T>(res: Response, data: T): void;
  notFound<T>(res: Response, data: T): void;
}
