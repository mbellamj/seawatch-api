import { IException } from '@interfaces/exception.interface';

export class DatabaseException {
  public static ENTITY_NOT_FOUND_ERROR: IException = {
    code: 1000,
    name: 'ENTITY_NOT_FOUND_ERROR',
    message: 'Entity not found.',
  };

  public static ENTITY_VALIDATION_ERROR: IException = {
    code: 1001,
    name: 'ENTITY_VALIDATION_ERROR',
    message: 'Entity validation error.',
  };

  public static ENTITY_ALREADY_EXISTS_ERROR: IException = {
    code: 1002,
    name: 'ENTITY_ALREADY_EXISTS_ERROR',
    message: 'Entity already exists.',
  };
}
