import { RouteInterface } from '@3205-test/common';
import {Response, Router} from 'express';

export interface ControllerInterface {
  readonly router: Router;
  addRoute(route: RouteInterface): void;
  send<T>(res: Response, statusCode: number, data: T): void;
  ok<T>(res: Response, data: T): void;
  created<T>(res: Response, data: T): void;
  noContent<T>(res: Response, data: T): void;
}
