import { AppError } from 'common/errors';
import { Exam } from 'modules/exam/domain';
import { Lab } from 'modules/lab/domain';

export namespace AssociationErrors {
  export class LabInactiveError extends AppError<string> {
    constructor(lab: Lab) {
      super(
        `O laboratório "${lab.id} - ${lab.name}" está desativado e não pode ser vinculado!`,
      );
    }
  }

  export class ExamInactiveError extends AppError<string> {
    constructor(exam: Exam) {
      super(
        `O exame "${exam.id} - ${exam.name}" está desativado e não pode ser vinculado!`,
      );
    }
  }

  export class AssociationAlreadyExists extends AppError<string> {
    constructor(lab: Lab, exam: Exam) {
      super(
        `O exame: "${exam.id} - ${exam.name}" já está cadastrado no laboratório: "${lab.id} - ${lab.name}"`,
      );
    }
  }

  export class AssociationNotFound extends AppError<string> {
    constructor() {
      super(`A associação informada não existe!`);
    }
  }
}
