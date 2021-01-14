import { Types } from 'mongoose';
import { Identifier } from 'common/domain/identifier';
import { ValidationError } from 'common/errors';
import { Result, ResultFactory } from 'common/core';

type UniqueEntityIdParam = string | number | Types.ObjectId;

export class UniqueEntityId extends Identifier<Types.ObjectId> {
  public constructor(value?: UniqueEntityIdParam) {
    super(
      Types.ObjectId.isValid(value)
        ? new Types.ObjectId(value)
        : new Types.ObjectId(),
    );
  }

  idIsEqual(id?: string | Types.ObjectId): boolean {
    return this.value.equals(id);
  }

  static createAndValidate(
    value?: UniqueEntityIdParam,
    name?: string,
  ): Result<ValidationError, UniqueEntityId> {
    if (Types.ObjectId.isValid(value) === false) {
      return ResultFactory.fail(
        new ValidationError([
          `Você precisa informar um ${name || 'id'} válido`,
        ]),
      );
    }

    return ResultFactory.ok(new UniqueEntityId(value));
  }
}
