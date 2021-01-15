import { ValidationError } from 'class-validator';
import { FastifyReply, FastifyRequest, FastifySchema } from 'fastify';
import { BaseController } from 'infra/http/models';
import { LabErrors } from 'modules/lab/errors';
import { UpdateLabUseCase } from './update-lab-use-case';

export class UpdateLabController extends BaseController {
  constructor(private readonly useCase: UpdateLabUseCase) {
    super();
  }

  public get schema(): FastifySchema {
    return {
      summary: 'Atualizar um laboratório',
      description: 'Atualizar um laboratório',
      tags: ['Laboratórios'],
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
        },
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          address: { type: 'string' },
          status: { type: 'string' },
        },
      },
      response: {
        201: {
          description: 'Sucesso!',
          type: 'null',
        },
      },
    };
  }

  protected async implementation(
    request: FastifyRequest<{ Params: { id: string }; Body: any }>,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.useCase.execute({
      ...request.params,
      ...request.body,
    });

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
