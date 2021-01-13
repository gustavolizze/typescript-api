import { Result, ResultFactory, UseCase } from 'common/core';
import { LabDto } from 'modules/lab/dto';
import { LabRepository } from 'modules/lab/repositories';

type Response = Result<Error, LabDto[]>;

export class GetActiveLabsUseCase implements UseCase<never, Response> {
  constructor(private readonly labRepository: LabRepository) {}

  async execute(input?: never): Promise<Response> {
    const result = await this.labRepository.findActiveLabs();

    return ResultFactory.ok(result || []);
  }
}
