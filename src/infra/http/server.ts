import fastify, { FastifyInstance } from 'fastify';
import { Environment } from 'environment';
import { ServerOptions } from './config';
import { v1Router } from './routers';
import { apiDocsPlugin } from './docs';

// Plugins
import helmet from 'fastify-helmet';
import cors from 'fastify-cors';
import compress from 'fastify-compress';
import fastifyStatic from 'fastify-static';
import path from 'path';

export function startServer(): Promise<FastifyInstance> {
  const app = fastify(ServerOptions);

  app.register(helmet, {
    contentSecurityPolicy: false,
  });
  app.register(cors);
  app.register(compress, {
    encodings: ['gzip', 'deflate'],
  });

  app.register(fastifyStatic, {
    root: path.join(process.cwd(), 'docs'),
  });

  apiDocsPlugin(app);

  app.register(v1Router, {
    prefix: 'api',
  });

  return app.listen(Environment.port, '0.0.0.0').then(() => app);
}
