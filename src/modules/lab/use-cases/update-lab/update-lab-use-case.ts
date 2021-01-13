import { Result, ResultFactory, UseCase } from 'common/core';
import { EntityStatus } from 'common/domain';
import { ValidationError } from 'common/errors';
import { LabAddress, LabName } from 'modules/lab/domain';
import { LabErrors } from 'modules/lab/errors';
import { LabRepository } from 'modules/lab/repositories';
import { UpdateLabDto } from './update-lab-dto';

type Response = Result<ValidationError | LabErrors.LabNotFound, void>;

export class UpdateLabUseCase implements UseCase<UpdateLabDto, Response> {
  constructor(private readonly labRepository: LabRepository) {}

  async execute(input?: UpdateLabDto): Promise<Response> {
    const nameOrError = input?.name ? LabName.create(input?.name) : undefined;
    const addressOrError = input?.address
      ? LabAddress.create(input.address)
      : undefined;
    const statusOrErro = input?.status
      ? EntityStatus.create(input?.status)
      : undefined;

    if (!nameOrError && !addressOrError && !statusOrErro) {
      return ResultFactory.fail(
        new ValidationError(['Não há nada para atualizar!']),
      );
    }

    const validation = ResultFactory.combine(
      nameOrError,
      addressOrError,
      statusOrErro,
    );

    if (validation.isFailure()) {
      return ResultFactory.fail(ValidationError.combine(validation.error));
    }

    const lab = await this.labRepository.findById(input.id);
    const labFound = !!lab;

    if (labFound === false) {
      return ResultFactory.fail(new LabErrors.LabNotFound());
    }

    lab.update({
      address: addressOrError?.value,
      name: nameOrError?.value,
      status: statusOrErro?.value,
    });

    await this.labRepository.update(lab);

    return ResultFactory.ok();
  }
}
