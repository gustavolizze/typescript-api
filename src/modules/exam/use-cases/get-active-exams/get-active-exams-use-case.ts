import { Result, UseCase } from 'common/core';
import { ExamDto } from 'modules/exam/dto';
import { ExamMap } from 'modules/exam/mappers';
import { ExamRepository } from 'modules/exam/repositories';

export class GetActiveExamsUseCase implements UseCase<never, ExamDto[]> {
  constructor(private readonly examRepository: ExamRepository) {}

  async execute(): Promise<ExamDto[]> {
    return this.examRepository
      .getActiveExams()
      .then((result) => result.map(ExamMap.fromPersistToDto));
  }
}
