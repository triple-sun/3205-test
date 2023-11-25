import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import HttpError from '../errors/http-error';
import ValidationError from '../errors/validation-error';
import { IExceptionFilter } from './exception-filter.interface';
import { ILogger } from '../logger/logger.interface';
import { ErrorMessage, InfoMessage, ErrorType, Component, createErrorObject } from '@3205-test/common';

@injectable()
export default class ExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(Component.LoggerInterface) private logger: ILogger
  ) {
    this.logger.info(InfoMessage.Filter);
  }

  private handleHttpError(
    error: HttpError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    this.logger.error(
      `[${error.detail}]: ${error.httpStatusCode} — ${error.message}`
    );
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(ErrorType.Common, error.message));
  }

  private handleOtherError(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    this.logger.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(ErrorType.Service, error.message));
  }

  private handleValidationError(
    error: ValidationError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    this.logger.error(`[${ErrorMessage.Validation}]: ${error.message}`);
    error.details.forEach((errorField) =>
      this.logger.error(`[${errorField.property}] — ${errorField.messages}`)
    );

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        createErrorObject(ErrorType.Service, error.message, error.details)
      );
  }

  public catch(
    error: Error | HttpError | ValidationError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    } else if (error instanceof ValidationError) {
      return this.handleValidationError(error, req, res, next);
    }

    this.handleOtherError(error, req, res, next);
  }
}
