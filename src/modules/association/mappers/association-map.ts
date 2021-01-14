import { AssociationSchema } from 'infra/database/mongoose/schemas';
import { Association } from 'modules/association/domain';

export class AssociationMap {
  static fromDomainToPersist(input: Association): AssociationSchema {
    return {
      _id: input.id.value,
      exam: input.exam,
      lab: input.lab,
    };
  }
}
