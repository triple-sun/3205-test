import ValidationError from '../errors/validation-error';
import { NextFunction, Request, Response } from 'express';
import { ClassConstructor } from 'class-transformer/types/interfaces/class-constructor.type';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ErrorMessage, MiddlewareInterface, transformErrors } from '@3205-test/common';

export class ValidateDTOMiddleware implements MiddlewareInterface {
  constructor(private DTO: ClassConstructor<object>) {}

  public async execute(
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const dtoInstance = plainToInstance(this.DTO, req.query);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new ValidationError(
        `${ErrorMessage.Validation} "${req.path}"`,
        transformErrors(errors)
      );
    }
    
    next();
  }
}
