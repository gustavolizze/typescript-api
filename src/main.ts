import sourceMapSupport from 'source-map-support';

import 'reflect-metadata';
import 'make-promises-safe';

import { startServer } from 'infra/http/server';
import { connect } from 'infra/database/mongoose/connect';
import { Logger } from 'infra/logger';

export const main = async () => {
  // Dependencies

  sourceMapSupport.install({
    environment: 'node',
  });

  try {
    await connect();

    const app = await startServer();

    Logger.info(app.printRoutes());
  } catch (err) {
    Logger.fatal(err, 'Erro ao iniciar server!');
    process.exit(1);
  }
};
