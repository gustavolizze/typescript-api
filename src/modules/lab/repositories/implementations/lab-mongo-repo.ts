import { Lab, LabStatusEnum } from 'modules/lab/domain';
import { LabRepository } from '../lab-repository';
import { LabMap } from 'modules/lab/mappers';
import { LabSchema } from 'infra/database/mongoose/schemas';
import { ReturnModelType } from '@typegoose/typegoose';
import { LabDto } from 'modules/lab/dto';

export class LabMongoRepo implements LabRepository {
  constructor(private readonly labModel: ReturnModelType<typeof LabSchema>) {}

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create(input?: Lab): Promise<void> {
    const toPersist = LabMap.fromDomainToPersist(input);
    await new this.labModel(toPersist).save();
  }

  existsByName(labName: string): Promise<boolean> {
    return this.labModel.exists({
      name: new RegExp(labName, 'i'),
    });
  }

  existsById(id: string): Promise<boolean> {
    return this.labModel.exists({
      _id: id,
    });
  }

  findActiveLabs(): Promise<LabDto[]> {
    return this.labModel
      .find({
        status: LabStatusEnum.Active,
      })
      .lean()
      .exec()
      .then((result) =>
        Array.isArray(result) ? result.map(LabMap.fromPersistToDto) : [],
      );
  }
}
