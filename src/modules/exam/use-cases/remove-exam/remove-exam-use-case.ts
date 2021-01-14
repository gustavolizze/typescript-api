import { Result, ResultFactory, UseCase } from 'common/core';
import { UniqueEntityId } from 'common/domain';
import { ValidationError } from 'common/errors';
import { ExamErrors } from 'modules/exam/errors';
import { ExamRepository } from 'modules/exam/repositories';
import { RemoveExamDto } from './remove-exam-dto';

type Response = Result<ValidationError | ExamErrors.ExamNotFound, void>;

export class RemoveExamUseCase implements UseCase<RemoveExamDto, Response> {
  constructor(private readonly examRepository: ExamRepository) {}

  async execute(input?: RemoveExamDto): Promise<Response> {
    const idOrError = UniqueEntityId.createAndValidate(input?.id);

    if (idOrError.isFailure()) {
      return ResultFactory.fail(idOrError.error);
    }

    const examExists = await this.examRepository.existsById(input.id);

    if (examExists === false) {
      return ResultFactory.fail(new ExamErrors.ExamNotFound());
    }

    await this.examRepository.delete(input?.id);

    return ResultFactory.ok();
  }
}
