import { AppError } from 'common/errors';

export namespace ExamErrors {
  export class ExamAlreadyExists extends AppError<string> {
    constructor(name: string) {
      super(`O exame: ${name}, já existe!`);
    }
  }

  export class ExamNotFound extends AppError<string> {
    constructor() {
      super(`O exame informado não existe!`);
    }
  }
}
