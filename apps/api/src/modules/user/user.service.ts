import { inject, injectable } from 'inversify';
import { UserServiceInterface } from './user-service.interface';
import { Config, JsonDB } from 'node-json-db';
import FindUserDTO from './dto/find-user.dto';
import { ConfigInterface } from '../../common/config/config.interface';
import { Component, Env, TUser } from '@3205-test/common';

@injectable()
export default class UserService implements UserServiceInterface {
  private db: JsonDB;

  constructor(
    @inject(Component.ConfigInterface) private config: ConfigInterface
  ) {
    this.db = new JsonDB(
      new Config(this.config.get(Env.DbPath), true, false, '/')
    );
  }

  public async index(): Promise<TUser[]> {
    return await this.db.getData('/')
  }

  public async find({
    email,
    number,
  }: FindUserDTO): Promise<TUser[] | undefined> {
    if (number) {
      return await this.db.filter<TUser>(
        '/',
        (user) => {
          return user.email === email && user.number === parseInt(number)
        }
      );
    }

    return await this.db.filter<TUser>('/', (user) => user.email === email);
  }
}
