import { ValidationError } from 'class-validator';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from 'infra/http/models';
import { ExamErrors } from 'modules/exam/errors';
import { CreateExamUseCase } from './create-exam-use-case';

export class CreateExamController extends BaseController {
  constructor(private readonly useCase: CreateExamUseCase) {
    super();
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
        return this.invalidRequest(reply, error);
      case ExamErrors.ExamAlreadyExists:
        return this.conflict(reply, error);
      default:
        return this.unexpectedError(reply, error);
    }
  }
}
