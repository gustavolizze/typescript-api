import { AppError } from './app-error';
import { flattenDeep } from 'lodash';

export class ValidationError extends AppError<string[]> {
  constructor(messages: string[]) {
    super(messages);
  }

  static combine(inputs: ValidationError[]): ValidationError {
    const messages = flattenDeep(inputs.map((input) => input.details));

    return new ValidationError(messages);
  }
}
