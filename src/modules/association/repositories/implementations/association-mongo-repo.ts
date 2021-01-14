import { ReturnModelType } from '@typegoose/typegoose';
import { AssociationSchema } from 'infra/database/mongoose/schemas';
import { Association } from 'modules/association/domain';
import { AssociationMap } from 'modules/association/mappers';
import { AssociationRepository } from '../association-repository';

export class AssociationMongoRepo implements AssociationRepository {
  constructor(
    private readonly associationModel: ReturnModelType<
      typeof AssociationSchema
    >,
  ) {}

  exists(labId: string, examId: string): Promise<boolean> {
    return this.associationModel.exists({
      exam: examId,
      lab: labId,
    });
  }

  async create(input: Association): Promise<void> {
    const associationPersist = AssociationMap.fromDomainToPersist(input);

    await new this.associationModel(associationPersist).save();
  }
}
