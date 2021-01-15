import { FastifyReply, FastifyRequest, FastifySchema } from 'fastify';
import { BaseController } from 'infra/http/models';
import { LabDtoSchema } from 'modules/lab/dto';
import { GetActiveLabsByExamDtoSchema } from './get-active-labs-by-exam-dto';
import { GetActiveLabsByExamUseCase } from './get-active-labs-by-exam-use-case';

export class GetActiveLabsByExamController extends BaseController {
  constructor(private readonly useCase: GetActiveLabsByExamUseCase) {
    super();
  }

  public get schema(): FastifySchema {
    return {
      summary: 'Obter os laboratórios pelo exame',
      description: 'Obter os laboratórios pelo exame',
      tags: ['Laboratórios'],
      querystring: GetActiveLabsByExamDtoSchema,
    };
  }

  protected async implementation(
    request: FastifyRequest<{ Querystring: any }>,
    reply: FastifyReply,
  ): Promise<void> {
    return this.useCase
      .execute(request.query)
      .then((result) => {
        this.success(reply, result);
      })
      .catch((err) => this.unexpectedError(reply, err));
  }
}
