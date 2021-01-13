import { FastifyRequest, FastifyReply } from 'fastify';
import { BaseController } from 'infra/http/models';
import { CreateLabUseCase } from './create-lab-use-case';
import { ValidationError } from 'common/errors';
import { LabErrors } from 'modules/lab/errors';

export class CreateLabController extends BaseController {
  constructor(private readonly useCase: CreateLabUseCase) {
    super();
  }

  protected async implementation(
    request: FastifyRequest<{ Body?: any }>,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.useCase.execute(request.body);

    if (result.isSuccess()) {
      return this.success(reply, result.value);
    }

    const error = result.error;

    switch (error.constructor) {
      case ValidationError:
        return this.invalidRequest(reply, error);
      case LabErrors.LabAlreadyExists:
        return this.conflict(reply, error);
      default:
        return this.unexpectedError(reply, error);
    }
  }
}
