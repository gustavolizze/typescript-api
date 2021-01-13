import { AppError } from 'common/errors';

export namespace LabErrors {
  export class LabAlreadyExists extends AppError<string> {
    constructor(name: string) {
      super(`O laboratório: "${name}" já existe!`);
    }
  }
}
