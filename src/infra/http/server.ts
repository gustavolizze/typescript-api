import fastify, { FastifyInstance } from 'fastify';
import { Environment } from 'environment';
import { ServerOptions } from './config';
import { v1Router } from './routers';

// Plugins
import helmet from 'fastify-helmet';
import cors from 'fastify-cors';
import compress from 'fastify-compress';

export function startServer(): Promise<FastifyInstance> {
  const app = fastify(ServerOptions);

  app.register(helmet);
  app.register(cors);
  app.register(compress, {
    encodings: ['gzip', 'deflate'],
  });
  app.register(v1Router, {
    prefix: 'api',
  });

  return app.listen(Environment.port, '0.0.0.0').then(() => app);
}
