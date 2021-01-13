import fastify from 'fastify';
import { Environment } from 'environment';
import { Logger } from 'infra/logger';
import { ServerOptions } from './config';
import { labRouter } from 'modules/lab/routes';

// Plugins
import helmet from 'fastify-helmet';
import cors from 'fastify-cors';
import compress from 'fastify-compress';

function startServer(): void {
  const app = fastify(ServerOptions);

  app.register(helmet);
  app.register(cors);
  app.register(compress, {
    encodings: ['gzip', 'deflate'],
  });

  // Routers
  app.register(labRouter, {
    prefix: '/api',
  });

  app.listen(Environment.port, '0.0.0.0', (error) => {
    if (error) {
      Logger.fatal({
        message: 'Erro ao iniciar servidor',
        error,
      });
      process.exit(1);
    }

    Logger.info(`Servidor iniciado às: ${new Date().toISOString()}`);
    Logger.info(app.printRoutes());
  });
}

export { startServer };
