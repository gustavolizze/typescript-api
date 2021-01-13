import { intersection, flattenDeep } from 'lodash';

interface GuardValidatorResult {
  succeeded: boolean;
  messages: string[];
}

interface GuardArgument<T> {
  argument: T;
  validators: (ValidatorObj<T> | ValidatorFn<T>)[];
  message: string;
}

type ValidatorFn<T> = (input: T) => boolean;
type ValidatorObj<T> = { validate: ValidatorFn<T>; message: string };

export class Guard {
  public static executeValidators<T>(
    input?: GuardArgument<T>,
  ): GuardValidatorResult {
    if (!input) {
      return {
        succeeded: false,
        messages: ['O argumento informado é inválido'],
      };
    }

    const { argument, message, validators } = input;

    const messages = intersection(
      validators
        .filter((validator) => {
          if (typeof validator === 'function') {
            return validator(argument) === false;
          }

          return validator.validate(argument) === false;
        })
        .map((validator) =>
          typeof validator === 'function' ? message : validator.message,
        ),
    );

    return {
      succeeded: messages.length <= 0,
      messages,
    };
  }

  public static executeValidatorsBulk(
    args?: GuardArgument<any>[],
  ): GuardValidatorResult {
    if (!args) {
      return {
        succeeded: false,
        messages: ['O parametro informado é inválido'],
      };
    }

    const messages = flattenDeep(
      args
        .map((arg) => Guard.executeValidators(arg))
        .filter((result) => result.succeeded === false)
        .map((result) => result.messages),
    );

    return {
      succeeded: messages.length <= 0,
      messages,
    };
  }
}
