import { Result, ResultFactory, UseCase } from 'common/core';
import { EntityStatus, UniqueEntityId } from 'common/domain';
import { ValidationError } from 'common/errors';
import { Association } from 'modules/association/domain';
import { AssociationErrors } from 'modules/association/errors';
import { AssociationRepository } from 'modules/association/repositories';
import { ExamErrors } from 'modules/exam/errors';
import { ExamRepository } from 'modules/exam/repositories';
import { LabErrors } from 'modules/lab/errors';
import { LabRepository } from 'modules/lab/repositories';
import { CreateAssociationDto } from './create-association-dto';

type Response = Result<
  | ValidationError
  | LabErrors.LabNotFound
  | ExamErrors.ExamNotFound
  | AssociationErrors.ExamInactiveError
  | AssociationErrors.LabInactiveError
  | AssociationErrors.AssociationAlreadyExists,
  void
>;

export class CreateAssociationUseCase
  implements UseCase<CreateAssociationDto, Response> {
  constructor(
    private readonly associationRepository: AssociationRepository,
    private readonly examRepository: ExamRepository,
    private readonly labRepository: LabRepository,
  ) {}

  async execute(input?: CreateAssociationDto): Promise<Response> {
    const labOrError = UniqueEntityId.createAndValidate(
      input?.lab,
      'laboratório',
    );
    const examOrError = UniqueEntityId.createAndValidate(input?.exam, 'exame');

    const validation = ResultFactory.combine(labOrError, examOrError);

    if (validation.isFailure()) {
      return ResultFactory.fail(ValidationError.combine(validation.error));
    }

    const associationLab = labOrError.value;
    const associationExam = examOrError.value;
    const inactiveStatus = EntityStatus.inactive();

    const lab = await this.labRepository.findById(associationLab.toString());
    const labFound = !!lab;

    if (labFound === false) {
      return ResultFactory.fail(new LabErrors.LabNotFound());
    }

    if (lab.status.equals(inactiveStatus)) {
      return ResultFactory.fail(new AssociationErrors.LabInactiveError(lab));
    }

    const exam = await this.examRepository.getById(associationExam.toString());
    const examFound = !!exam;

    if (examFound === false) {
      return ResultFactory.fail(new ExamErrors.ExamNotFound());
    }

    if (exam.status.equals(inactiveStatus)) {
      return ResultFactory.fail(new AssociationErrors.ExamInactiveError(exam));
    }

    const associationAlreadyExists = await this.associationRepository.exists(
      lab.id.toString(),
      exam.id.toString(),
    );

    if (associationAlreadyExists) {
      return ResultFactory.fail(
        new AssociationErrors.AssociationAlreadyExists(lab, exam),
      );
    }

    const association = Association.create({
      lab: labOrError.value,
      exam: examOrError.value,
    });

    await this.associationRepository.create(association);

    return ResultFactory.ok();
  }
}
