import { Result, UseCase } from 'common/core';
import { LabDto } from 'modules/lab/dto';
import { LabMap } from 'modules/lab/mappers';
import { LabRepository } from 'modules/lab/repositories';
import { GetActiveLabsByExamDto } from './get-active-labs-by-exam-dto';

export class GetActiveLabsByExamUseCase
  implements UseCase<GetActiveLabsByExamDto, LabDto[]> {
  constructor(private readonly labRepository: LabRepository) {}

  async execute(input?: GetActiveLabsByExamDto): Promise<LabDto[]> {
    const result = await this.labRepository.findActiveLabsByExamName(
      input?.examName || '',
    );

    return result.map((item) => LabMap.fromPersistToDto(item));
  }
}
