import { ValidationError } from 'common/errors';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from 'infra/http/models';
import { LabErrors } from 'modules/lab/errors';
import { RemoveLabUseCase } from './remove-lab-use-case';

export class RemoveLabController extends BaseController {
  constructor(private readonly useCase: RemoveLabUseCase) {
    super();
  }

  protected async implementation(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.useCase.execute(request.params);

    if (result.isSuccess()) {
      return this.success(reply, result.value);
    }

    const error = result.error;

    switch (error.constructor) {
      case ValidationError:
        return this.invalidRequest(reply, error);
      case LabErrors.LabNotFound:
        return this.notFound(reply, error);
      default:
        return this.unexpectedError(reply, error);
    }
  }
}
