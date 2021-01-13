import { ValueObject } from 'common/domain';
import { Guard, Result, ResultFactory } from 'common/core';
import { ValidationError } from 'common/errors';
import { isNotEmpty, minLength, maxLength } from 'class-validator';

interface LabNameProps {
  name: string;
}

export class LabName extends ValueObject<LabNameProps> {
  public get value() {
    return this.props.name;
  }

  static create(name: string): Result<ValidationError, LabName> {
    const guard = Guard.executeValidators({
      argument: name,
      message:
        'Você precisa informar um nome válido de no minimo 2 caracteres e no máximo 50 caracteres!',
      validators: [
        isNotEmpty,
        (input: string) => minLength(input, 2),
        (input: string) => maxLength(input, 50),
      ],
    });

    if (guard.succeeded === false) {
      return ResultFactory.fail(new ValidationError(guard.messages));
    }

    return ResultFactory.ok(
      new LabName({
        name,
      }),
    );
  }
}
