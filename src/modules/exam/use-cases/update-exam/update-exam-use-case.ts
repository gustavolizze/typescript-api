import { Result, ResultFactory, UseCase } from 'common/core';
import { EntityStatus } from 'common/domain';
import { ValidationError } from 'common/errors';
import { ExamName, ExamType } from 'modules/exam/domain';
import { ExamErrors } from 'modules/exam/errors';
import { ExamRepository } from 'modules/exam/repositories';
import { type } from 'os';
import { UpdateExamDto } from './update-exam-dto';

type Response = Result<ValidationError | ExamErrors.ExamNotFound, void>;

export class UpdateExamUseCase implements UseCase<UpdateExamDto, Response> {
  constructor(private readonly examRepository: ExamRepository) {}

  async execute(input?: UpdateExamDto): Promise<Response> {
    const nameOrError = input?.name ? ExamName.create(input.name) : undefined;
    const typeOrError = input?.type ? ExamType.create(input.type) : undefined;
    const statusOrError = input?.status
      ? EntityStatus.create(input.status)
      : undefined;

    const notFoundUpdate = !nameOrError && !typeOrError && !statusOrError;

    if (notFoundUpdate) {
      return ResultFactory.fail(
        new ValidationError(['Você não informou nenhum parametro!']),
      );
    }

    const validation = ResultFactory.combine(
      nameOrError,
      typeOrError,
      statusOrError,
    );

    if (validation.isFailure()) {
      return ResultFactory.fail(ValidationError.combine(validation.error));
    }

    const examName = nameOrError?.value;
    const examType = typeOrError?.value;
    const examStatus = statusOrError?.value;

    const exam = await this.examRepository.getById(input?.id);
    const examFound = !!exam;

    if (examFound === false) {
      return ResultFactory.fail(new ExamErrors.ExamNotFound());
    }

    exam.update({
      name: examName,
      type: examType,
      status: examStatus,
    });

    await this.examRepository.update(exam);

    return ResultFactory.ok();
  }
}
