import { FastifyServerOptions } from 'fastify';
import { Server } from 'http';
import { Environment } from 'environment';
import { Logger } from 'infra/logger';

export const ServerOptions: FastifyServerOptions<Server> = {
  connectionTimeout: Environment.endpointTimeout,
  logger: Logger,
};
