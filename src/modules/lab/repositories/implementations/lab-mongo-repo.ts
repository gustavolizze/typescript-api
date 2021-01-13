import { Lab } from 'modules/lab/domain';
import { LabRepository } from '../lab-repository';
import { LabMap } from 'modules/lab/mappers';
import { LabSchema } from 'infra/database/mongoose/schemas';
import { ReturnModelType } from '@typegoose/typegoose';

export class LabMongoRepo implements LabRepository {
  constructor(private readonly labModel: ReturnModelType<typeof LabSchema>) {}

  async create(input?: Lab): Promise<void> {
    const toPersist = LabMap.fromDomainToPersist(input);
    await new this.labModel(toPersist).save();
  }

  exists(labName: string): Promise<boolean> {
    return this.labModel.exists({
      name: new RegExp(labName, 'i'),
    });
  }
}
