import { FastifyReply, FastifyRequest, FastifySchema } from 'fastify';
import { BaseController } from 'infra/http/models';
import { LabDtoSchema } from 'modules/lab/dto';
import { GetActiveLabsUseCase } from './get-active-labs-use-case';

export class GetActiveLabsController extends BaseController {
  constructor(private readonly useCase: GetActiveLabsUseCase) {
    super();
  }

  public get schema(): FastifySchema {
    return {
      summary: 'Obter os laboratórios ativos',
      description: 'Obter os laboratórios ativos',
      tags: ['Laboratórios'],
    };
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
