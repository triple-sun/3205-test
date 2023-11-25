import { inject, injectable } from 'inversify';
import { IUserService } from './user-service.interface';
import { Config, JsonDB } from 'node-json-db';
import FindUserDTO from './dto/find-user.dto';
import { Component, Env, TUser } from '@3205-test/common';
import { IConfig } from '../../common/config/config.interface';
import { ILogger } from '../../common/logger/logger.interface';

@injectable()
export default class UserService implements IUserService {
  private db: JsonDB;

  constructor(
    @inject(Component.LoggerInterface) private logger: ILogger,
    @inject(Component.ConfigInterface) private config: IConfig
  ) {
    this.db = new JsonDB(
      new Config(this.config.get(Env.DbPath), true, false, '/')
    );
  }

  public async index(): Promise<TUser[]> {
    return await this.db.getData('/');
  }

  public async find({ email, number }: FindUserDTO): Promise<TUser[]> {
    const found = number
      ? await this.db.filter<TUser>(
          '/',
          (user) => user.email === email && user.number === parseInt(number)
        )
      : await this.db.filter<TUser>('/', (user) => user.email === email);

    return found
  }
}
