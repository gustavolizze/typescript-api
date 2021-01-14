import { ValidationError } from 'common/errors';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from 'infra/http/models';
import { AssociationErrors } from 'modules/association/errors';
import { ExamErrors } from 'modules/exam/errors';
import { LabErrors } from 'modules/lab/errors';
import { CreateAssociationUseCase } from './create-association-use-case';

export class CreateAssociationController extends BaseController {
  constructor(private readonly useCase: CreateAssociationUseCase) {
    super();
  }

  protected async implementation(
    request: FastifyRequest<{ Body: any }>,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.useCase.execute(request.body);

    if (result.isSuccess()) {
      return this.noContent(reply);
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
