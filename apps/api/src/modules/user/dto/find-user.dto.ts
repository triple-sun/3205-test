import { IFindUser } from './../../../../../../libs/core/src/lib/interfaces/find-user.interface';
import { IsEmail, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ErrorMessage } from '@3205-test/common';

export default class FindUserDTO implements IFindUser {
  @Transform(({value}) => parseInt(value))
  @IsOptional()
  @IsInt({message: ErrorMessage.NotValidNumber})
  public number?: string;

  @IsEmail({message: ErrorMessage.NotValidEmail})
  @IsNotEmpty({message: ErrorMessage.RequiredEmail})
  public email!: string;
}

