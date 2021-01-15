import { FastifyReply, FastifyRequest, FastifySchema } from 'fastify';
import { BaseController } from 'infra/http/models';
import { ExamDtoSchema } from 'modules/exam/dto';
import { GetActiveExamsUseCase } from './get-active-exams-use-case';

export class GetActiveExamsController extends BaseController {
  constructor(private readonly useCase: GetActiveExamsUseCase) {
    super();
  }

  public get schema(): FastifySchema {
    return {
      summary: 'Obter exames ativos',
      description: 'Obter exames ativos',
      tags: ['Exames'],
    };
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
