import { UseCase, ResultFactory, Result } from 'common/core';
import { ValidationError } from 'common/errors';
import { LabDto } from 'modules/lab/dto';
import { Lab, LabAddress, LabName, LabStatusEnum } from 'modules/lab/domain';
import { CreateLabDto } from './create-lab-dto';
import { LabRepository } from 'modules/lab/repositories';
import { LabErrors } from 'modules/lab/errors';
import { LabMap } from 'modules/lab/mappers';

type Response = Result<ValidationError | LabErrors.LabAlreadyExists, LabDto>;

export class CreateLabUseCase implements UseCase<CreateLabDto, Response> {
  constructor(private readonly labRepository: LabRepository) {}

  async execute(input?: CreateLabDto): Promise<Response> {
    const labNameOrError = LabName.create(input?.name);
    const labAddressOrError = LabAddress.create(input?.address);

    const validation = ResultFactory.combine(labNameOrError, labAddressOrError);

    if (validation.isFailure()) {
      return ResultFactory.fail(ValidationError.combine(validation.error));
    }

    const labName = labNameOrError.value;
    const labAddress = labAddressOrError.value;
    const labExists = await this.labRepository.exists(labName.value);

    if (labExists) {
      return ResultFactory.fail(new LabErrors.LabAlreadyExists(labName.value));
    }

    const lab = Lab.create({
      name: labName,
      address: labAddress,
      status: LabStatusEnum.Active,
    });

    await this.labRepository.create(lab);

    return ResultFactory.ok(LabMap.fromDomainToDto(lab));
  }
}
