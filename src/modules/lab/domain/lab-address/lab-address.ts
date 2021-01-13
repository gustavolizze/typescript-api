import { ValueObject } from 'common/domain';
import { Guard, ResultFactory, Result } from 'common/core';
import { ValidationError } from 'common/errors';
import { isNotEmpty, maxLength, minLength } from 'class-validator';

interface LabAddressProps {
  address: string;
}

export class LabAddress extends ValueObject<LabAddressProps> {
  public get value() {
    return this.props.address;
  }

  static create(address?: string): Result<ValidationError, LabAddress> {
    const guard = Guard.executeValidators({
      argument: address,
      message:
        'Você precisa informar um endereço válido de no minimo 2 caracteres e no máximo 50 caracteres!',
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
      new LabAddress({
        address,
      }),
    );
  }
}
