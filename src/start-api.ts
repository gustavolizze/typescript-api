import sourceMapSupport from 'source-map-support';

import 'reflect-metadata';
import 'make-promises-safe';

import { startServer } from 'infra/http/server';

export const startApi = async () => {
  // Dependencies

  sourceMapSupport.install({
    environment: 'node',
  });

  return startServer();
};
