import { Environment } from 'environment';

export class AppError<T extends unknown | string> extends Error {
  readonly details: T;

  constructor(details: T, message?: string, stack?: string) {
    const formattedDetails = details || null;

    const formattedMessage = message
      ? message
      : 'Não foi possível processar sua solicitação, tente novamente mais tarde.';

    super(formattedMessage);

    if (stack) {
      this.stack = stack;
    }

    this.details = formattedDetails;
    Object.freeze(this);
  }

  serialize(): { details: T; message: string; stack?: string } {
    const current = {
      details: this.details,
      message: this.message,
      stack: this.stack,
    };

    if (Environment.isDev === false) {
      delete current.stack;
    }

    return current;
  }
}
