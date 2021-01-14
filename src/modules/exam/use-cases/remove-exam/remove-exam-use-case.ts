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
    const id = new UniqueEntityId(input?.id);

    if (id.idIsEqual(input?.id) === false) {
      return ResultFactory.fail(
        new ValidationError(['O id informado é invalido!']),
      );
    }

    const examExists = await this.examRepository.existsById(input.id);

    if (examExists === false) {
      return ResultFactory.fail(new ExamErrors.ExamNotFound());
    }

    await this.examRepository.delete(input?.id);

    return ResultFactory.ok();
  }
}
