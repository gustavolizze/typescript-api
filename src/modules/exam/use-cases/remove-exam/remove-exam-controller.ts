import { ValidationError } from 'class-validator';
import { FastifyReply, FastifyRequest, FastifySchema } from 'fastify';
import { BaseController } from 'infra/http/models';
import { ExamErrors } from 'modules/exam/errors';
import { RemoveExamUseCase } from './remove-exam-use-case';

export class RemoveExamController extends BaseController {
  constructor(private readonly useCase: RemoveExamUseCase) {
    super();
  }

  public get schema(): FastifySchema {
    return {
      summary: 'Remover exame',
      description: 'Remover exame',
      tags: ['Exames'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
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
      case ExamErrors.ExamNotFound:
        return this.notFound(reply, error);
      default:
        return this.unexpectedError(reply, error);
    }
  }
}
