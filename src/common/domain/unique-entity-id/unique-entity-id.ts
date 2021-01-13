import { Types } from 'mongoose';
import { Identifier } from 'common/domain/identifier';

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
}
