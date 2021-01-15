import { Environment } from 'environment';
import { AppError } from 'common/errors';
import { FastifyReply, FastifyRequest, FastifySchema } from 'fastify';
import { HttpStatusCode } from './http-status-code';

export abstract class BaseController {
  constructor() {
    this.implementation = this.implementation.bind(this);
  }

  public abstract get schema(): FastifySchema;

  protected abstract implementation(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> | void;

  public async execute(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      await this.implementation(request, reply);
    } catch (error) {
      request.log.error(`[${this.constructor.name}]: ${error.stack}`);
      this.unexpectedError(reply, error);
    }
  }

  public reply<T>(
    reply: FastifyReply,
    code: HttpStatusCode,
    data?: T,
    error?: AppError<unknown>,
  ): void {
    if (!data && !error) {
      reply.status(code).send();
      return;
    }

    reply.status(code).send({
      data: data ? data : undefined,
      error: error ? error.serialize() : undefined,
    });
  }

  public success<T>(reply: FastifyReply, data: T): void {
    return this.reply(reply, HttpStatusCode.OK, data);
  }

  public created(reply: FastifyReply): void {
    return this.reply(reply, HttpStatusCode.CREATED);
  }

  public noContent(reply: FastifyReply): void {
    return this.reply(reply, HttpStatusCode.NO_CONTENT);
  }

  public conflict(reply: FastifyReply, error: AppError<unknown>): void {
    return this.reply(reply, HttpStatusCode.CONFLICT, undefined, error);
  }

  public invalidRequest(reply: FastifyReply, error: AppError<unknown>): void {
    return this.reply(reply, HttpStatusCode.BAD_REQUEST, undefined, error);
  }

  public notFound(reply: FastifyReply, error: AppError<unknown>): void {
    return this.reply(reply, HttpStatusCode.NOT_FOUND, undefined, error);
  }

  public unexpectedError(reply: FastifyReply, error: Error): void {
    const message = Environment.isDev
      ? error.message
      : 'Não foi possível processar sua solicitação, pois um erro não identificado ocorreu!';

    return this.reply(
      reply,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      undefined,
      new AppError(message, error?.stack),
    );
  }
}
