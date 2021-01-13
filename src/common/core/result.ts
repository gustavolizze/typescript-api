import { flattenDeep } from 'lodash';
import { Error } from 'mongoose';

class Failure<TError, TValue = unknown> {
  private readonly _error: TError;

  constructor(error: TError) {
    this._error = error;
  }

  get value(): TValue {
    throw new Error(
      'Você não consegue obter o valor de um resultado que falhou!',
    );
  }

  get error(): TError {
    return this._error;
  }

  isFailure(): this is Failure<TError, TValue> {
    return true;
  }

  isSuccess(): this is Success<TError, TValue> {
    return false;
  }
}

class Success<TError, TValue = unknown> {
  private readonly _value: TValue;

  constructor(value: TValue) {
    this._value = value;
  }

  get value(): TValue {
    return this._value;
  }

  get error(): TError {
    throw new Error('Um resultado de sucesso, não contém erro!');
  }

  isFailure(): this is Failure<Error, TValue> {
    return false;
  }

  isSuccess(): this is Success<Error, TValue> {
    return true;
  }
}

export type Result<TError, TValue = unknown> =
  | Failure<TError, TValue>
  | Success<TError, TValue>;

export class ResultFactory {
  static fail<TError, TValue>(input: TError): Result<TError, TValue> {
    return new Failure(input);
  }

  static ok<TError, TValue>(input?: TValue): Result<TError, TValue> {
    return new Success(input);
  }

  static try<TError, TValue>(toTry: () => TValue): Result<TError, TValue> {
    try {
      return new Success(toTry());
    } catch (error) {
      return new Failure(error as TError);
    }
  }

  static combine<TError>(
    ...args: Result<TError, unknown>[]
  ): Result<TError extends unknown[] ? TError : TError[], void> {
    const errors = flattenDeep(
      args.filter((arg) => arg && arg.isFailure()).map((arg) => arg.error),
    );

    const isSuccess = errors.length === 0;

    if (isSuccess) {
      return ResultFactory.ok();
    }

    type Returns = TError extends unknown[] ? TError : TError[];

    return ResultFactory.fail<Returns, void>(errors as Returns);
  }
}
