import { Types } from 'mongoose';
import { Identifier } from 'common/domain/identifier';

export class UniqueEntityId extends Identifier<Types.ObjectId> {
  public constructor(value?: string) {
    super(
      Types.ObjectId.isValid(value)
        ? new Types.ObjectId(value)
        : new Types.ObjectId(),
    );
  }
}
