import { Environment } from 'environment';
import { FastifyRequest } from 'fastify';
import pino from 'pino';

export const Logger = pino({
  level: 'info',
  redact: ['req.headers.authorization'],
  serializers: {
    req(req: FastifyRequest) {
      return {
        body: req.body,
        method: req.method,
        parameters: req.params,
        url: req.url,
        headers: req.headers,
        hostname: req.hostname,
        remoteAddress: req.ip,
        remotePort: req.connection.remotePort,
      };
    },
  },
  prettyPrint: Environment.isDev
    ? {
        levelFirst: true,
        colorize: true,
        crlf: true,
        translateTime: true,
      }
    : false,
  // eslint-disable-next-line node/no-unpublished-require
  prettifier: Environment.isDev ? require('pino-pretty') : false,
});
