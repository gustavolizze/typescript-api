import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from 'infra/http/models';
import { GetActiveLabsUseCase } from './get-active-labs-use-case';

export class GetActiveLabsController extends BaseController {
  constructor(private readonly useCase: GetActiveLabsUseCase) {
    super();
  }

  protected async implementation(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.useCase.execute();

    if (result.isSuccess()) {
      return this.success(reply, result.value);
    }

    return this.unexpectedError(reply, result.error);
  }
}
