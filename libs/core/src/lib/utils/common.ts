import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ValidationErrorField } from '../types/validation-error-field.type.js';
import { ErrorType } from '../enums/logging.enum.js';

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const getFullServerPath = (host: string, port: number) =>
  `http://${host}:${port}`;

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });

export const createErrorObject = (
  errorType: ErrorType,
  message: string,
  details: ValidationErrorField[] = []
) => ({
  errorType: errorType,
  message,
  details: [...details],
});

export const transformErrors = (
  errors: ValidationError[]
): ValidationErrorField[] =>
  errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : [],
  }));
