import { Result, ResultFactory, UseCase } from 'common/core';
import { CreateExamDto } from './create-exam-dto';
import { ExamDto } from 'modules/exam/dto';
import { ExamErrors } from 'modules/exam/errors';
import { ExamRepository } from 'modules/exam/repositories';
import { Exam, ExamName, ExamType } from 'modules/exam/domain';
import { ValidationError } from 'common/errors';
import { EntityStatus } from 'common/domain';
import { ExamMap } from 'modules/exam/mappers';

type Response = Result<ValidationError | ExamErrors.ExamAlreadyExists, ExamDto>;

export class CreateExamUseCase implements UseCase<CreateExamDto, Response> {
  constructor(private readonly examRepository: ExamRepository) {}

  async execute(input?: CreateExamDto): Promise<Response> {
    const nameOrError = ExamName.create(input?.name);
    const typeOrError = ExamType.create(input?.type);

    const validation = ResultFactory.combine(nameOrError, typeOrError);

    if (validation.isFailure()) {
      return ResultFactory.fail(ValidationError.combine(validation.error));
    }

    const examName = nameOrError.value;
    const examType = typeOrError.value;
    const examExists = await this.examRepository.existsByName(examName);

    if (examExists) {
      return ResultFactory.fail(
        new ExamErrors.ExamAlreadyExists(examName.value),
      );
    }

    const exam = Exam.create({
      name: examName,
      type: examType,
      status: EntityStatus.active(),
    });

    await this.examRepository.create(exam);

    return ResultFactory.ok(ExamMap.fromDomainToDto(exam));
  }
}
