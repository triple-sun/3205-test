import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller';
import { LoggerInterface } from '../../common/logger/logger.interface';
import { UserServiceInterface } from './user-service.interface';
import { ValidateDTOMiddleware } from '../../common/middlewares/validate-dto.middleware';
import { StatusCodes } from 'http-status-codes';
import { ConfigInterface } from '../../common/config/config.interface';
import HttpError from '../../common/errors/http-error';
import UserResponse from './response/user.response';
import FindUserDTO from './dto/find-user.dto';
import { Component, ErrorMessage, HttpMethod, InfoMessage, fillDTO } from '@3205-test/common';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.UserServiceInterface)
    private readonly userService: UserServiceInterface
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
      handler: this.show,
      middlewares: [new ValidateDTOMiddleware(FindUserDTO)],
    });
  }

  public async index(req: Request, res: Response): Promise<void> {
    console.log(req);

    const users = await this.userService.index();

    this.ok(res, fillDTO(UserResponse, users));
  }

  public async show({ query }: Request, res: Response): Promise<void> {
    const dto = {
      email: query.email as string,
      number: query.number as string,
    };

    const users = await this.userService.find(dto);

    if (!users || users.length <= 0) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        ErrorMessage.NotFoundUser,
        'UserController'
      );
    }

    this.ok(res, fillDTO(UserResponse, users));

  }
}
