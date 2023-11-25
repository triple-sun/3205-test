import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller';
import { ILogger } from '../../common/logger/logger.interface';
import { IUserService } from './user-service.interface';
import { ValidateDTOMiddleware } from '../../common/middlewares/validate-dto.middleware';
import { IConfig } from '../../common/config/config.interface';
import UserResponse from './response/user.response';
import FindUserDTO from './dto/find-user.dto';
import { Component, HttpMethod, InfoMessage, fillDTO } from '@3205-test/common';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: ILogger,
    @inject(Component.ConfigInterface) configService: IConfig,
    @inject(Component.UserServiceInterface)
    private readonly userService: IUserService
  ) {
    super(logger, configService);

    this.logger.info(InfoMessage.UserController);

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
    });

    this.addRoute({
      path: '/users',
      method: HttpMethod.Get,
      handler: this.find,
      middlewares: [new ValidateDTOMiddleware(FindUserDTO)],
    });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const users = await this.userService.index();

    res.set('Access-Control-Allow-Origin', '*');
    this.ok(res, fillDTO(UserResponse, users));
  }

  public async find({ query }: Request, res: Response): Promise<void> {
    const dto = {
      email: query.email as string,
      number: query.number as string,
    };

    const users = await this.userService.find(dto);

    res.set('Access-Control-Allow-Origin', '*');
    this.ok(res, fillDTO(UserResponse, users));
  }
}
