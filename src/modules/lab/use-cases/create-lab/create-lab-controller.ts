import { FastifyRequest, FastifyReply, FastifySchema } from 'fastify';
import { BaseController } from 'infra/http/models';
import { CreateLabUseCase } from './create-lab-use-case';
import { ValidationError } from 'common/errors';
import { LabErrors } from 'modules/lab/errors';
import { CreateLabDtoSchema } from './create-lab-dto';
import { LabDtoSchema } from 'modules/lab/dto';

export class CreateLabController extends BaseController {
  constructor(private readonly useCase: CreateLabUseCase) {
    super();
  }

  public get schema(): FastifySchema {
    return {
      summary: 'Criar um laboratório',
      description: 'Criar um laboratório',
      tags: ['Laboratórios'],
      body: CreateLabDtoSchema,
    };
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
