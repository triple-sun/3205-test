import { Expose } from 'class-transformer';

export default class UserResponse {
  @Expose()
  public number!: number;

  @Expose()
  public email!: string;
}
