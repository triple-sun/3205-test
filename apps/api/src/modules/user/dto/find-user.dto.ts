import { IFindUser } from '@3205-test/common';
import { IsEmail, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ErrorMessage } from '@3205-test/common';

export default class FindUserDTO implements IFindUser {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: ErrorMessage.NotValidNumber })
  public number?: string;

  @IsEmail({ message: ErrorMessage.NotValidEmail })
  @IsNotEmpty({ message: ErrorMessage.RequiredEmail })
  public email!: string;
}

