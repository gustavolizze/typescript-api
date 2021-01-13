import { AppError } from 'common/errors';

export namespace LabErrors {
  export class LabAlreadyExists extends AppError<string> {
    constructor(name: string) {
      super(`O laboratório: "${name}" já existe!`);
    }
  }

  export class LabNotFound extends AppError<string> {
    constructor() {
      super(`O laboratório informado não existe!`);
    }
  }
}
