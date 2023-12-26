import { Optional } from 'src/core/utils/types';

export interface IException {
  name: string;
  code: number;
  message: string;
}

type ICreateException<IDataType> = {
  code: IException;
  overrideMessage?: string;
  data?: IDataType;
};

export class Exception<IDataType> extends Error {
  public readonly code: number;

  public readonly data: Optional<IDataType>;

  private constructor(
    exception: IException,
    overrideMessage?: string,
    data?: IDataType,
  ) {
    super();

    this.name = this.constructor.name;
    this.code = exception.code;
    this.data = data;
    this.message = overrideMessage || exception.message;

    Error.captureStackTrace(this, this.constructor);
  }

  public static new<IDataType>(
    payload: ICreateException<IDataType>,
  ): Exception<IDataType> {
    return new Exception(payload.code, payload.overrideMessage, payload.data);
  }
}
