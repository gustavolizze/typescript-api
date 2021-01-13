import { Result, ResultFactory, UseCase } from 'common/core';
import { UniqueEntityId } from 'common/domain';
import { ValidationError } from 'common/errors';
import { LabErrors } from 'modules/lab/errors';
import { LabRepository } from 'modules/lab/repositories';
import { RemoveLabDto } from './remove-lab-dto';

type Response = Result<LabErrors.LabNotFound | ValidationError, void>;

export class RemoveLabUseCase implements UseCase<RemoveLabDto, Response> {
  constructor(private readonly labRepository: LabRepository) {}

  async execute(input?: RemoveLabDto): Promise<Response> {
    const labId = new UniqueEntityId(input?.id);

    if (labId.idIsEqual(input?.id) === false) {
      return ResultFactory.fail(
        new ValidationError(['O id informado é inválido!']),
      );
    }

    const exists = await this.labRepository.existsById(labId.toString());

    if (exists === false) {
      return ResultFactory.fail(new LabErrors.LabNotFound());
    }

    await this.labRepository.delete(labId.toString());

    return ResultFactory.ok();
  }
}
