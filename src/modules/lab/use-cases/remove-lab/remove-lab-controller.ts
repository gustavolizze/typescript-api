import { ValidationError } from 'common/errors';
import { FastifyReply, FastifyRequest, FastifySchema } from 'fastify';
import { BaseController } from 'infra/http/models';
import { LabErrors } from 'modules/lab/errors';
import { RemoveLabDtoSchema } from './remove-lab-dto';
import { RemoveLabUseCase } from './remove-lab-use-case';

export class RemoveLabController extends BaseController {
  constructor(private readonly useCase: RemoveLabUseCase) {
    super();
  }

  public get schema(): FastifySchema {
    return {
      summary: 'Remover um laboratório',
      description: 'Remover um laboratório',
      tags: ['Laboratórios'],
      params: RemoveLabDtoSchema,
      response: {
        204: {
          description: 'Sucesso!',
          type: 'null',
        },
      },
    };
  }

  protected async implementation(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.useCase.execute(request.params);

    if (result.isSuccess()) {
      return this.noContent(reply);
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
