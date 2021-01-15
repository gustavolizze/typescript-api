import { ValidationError } from 'common/errors';
import { FastifyReply, FastifyRequest, FastifySchema } from 'fastify';
import { BaseController } from 'infra/http/models';
import { AssociationErrors } from 'modules/association/errors';
import { ExamErrors } from 'modules/exam/errors';
import { LabErrors } from 'modules/lab/errors';
import { CreateAssociationDtoSchema } from './create-association-dto';
import { CreateAssociationUseCase } from './create-association-use-case';

export class CreateAssociationController extends BaseController {
  constructor(private readonly useCase: CreateAssociationUseCase) {
    super();
  }

  public get schema(): FastifySchema {
    return {
      summary: 'Criar uma associação',
      description: 'Criar uma associação',
      tags: ['Associações'],
      body: CreateAssociationDtoSchema,
    };
  }

  protected async implementation(
    request: FastifyRequest<{ Body: any }>,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.useCase.execute(request.body);

    if (result.isSuccess()) {
      return this.success(reply, result.value);
    }

    const error = result.error;

    switch (error.constructor) {
      case ValidationError:
      case AssociationErrors.LabInactiveError:
      case AssociationErrors.ExamInactiveError:
        return this.invalidRequest(reply, error);
      case LabErrors.LabNotFound:
      case ExamErrors.ExamNotFound:
      case AssociationErrors.AssociationAlreadyExists:
        return this.conflict(reply, error);
      default:
        return this.unexpectedError(reply, error);
    }
  }
}
