import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from 'infra/http/models';
import { GetActiveLabsByExamUseCase } from './get-active-labs-by-exam-use-case';

export class GetActiveLabsByExamController extends BaseController {
  constructor(private readonly useCase: GetActiveLabsByExamUseCase) {
    super();
  }

  protected async implementation(
    request: FastifyRequest<{ Querystring: any }>,
    reply: FastifyReply,
  ): Promise<void> {
    return this.useCase
      .execute(request.query)
      .then((result) => this.success(reply, result))
      .catch((err) => this.unexpectedError(reply, err));
  }
}
