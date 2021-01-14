import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from 'infra/http/models';
import { GetActiveExamsUseCase } from './get-active-exams-use-case';

export class GetActiveExamsController extends BaseController {
  constructor(private readonly useCase: GetActiveExamsUseCase) {
    super();
  }

  protected async implementation(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    return this.useCase
      .execute()
      .then((result) => this.success(reply, result))
      .catch((err) => this.unexpectedError(reply, err));
  }
}
