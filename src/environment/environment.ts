import { AllEnvironments, UniqueEnvironment } from './types';
import { merge } from 'lodash';

const DefaultEnvironment = process.env.NODE_ENV || 'dev';

const Environments: AllEnvironments = {
  all: {
    isDev: DefaultEnvironment === 'dev',
    port: 8080,
  },
  dev: {
    name: 'Development',
    endpointTimeout: 30 * 60 * 1000, // 30 Minutos,
    mongo: {
      dbName: 'db-dev',
      url:
        'mongodb+srv://dasalab.wgn6j.mongodb.net?retryWrites=true&w=majority',
      user: 'root',
      password: 'CP9R83TCim0UbHw8',
    },
  },
  staging: {
    name: 'Staging',
    endpointTimeout: 5 * 60 * 1000, // 5 Minutos
    mongo: {
      dbName: 'db-staging',
      url:
        'mongodb+srv://dasalab.wgn6j.mongodb.net?retryWrites=true&w=majority',
      user: 'root',
      password: 'CP9R83TCim0UbHw8',
    },
  },
  production: {
    name: 'Production',
    endpointTimeout: 5 * 60 * 1000, // 5 Minutos,
    mongo: {
      dbName: 'db-prod',
      url:
        'mongodb+srv://dasalab.wgn6j.mongodb.net?retryWrites=true&w=majority',
      user: 'root',
      password: 'CP9R83TCim0UbHw8',
    },
  },
};

export const Environment = merge(
  Environments.all,
  Environments[
    DefaultEnvironment as keyof AllEnvironments
  ] as UniqueEnvironment,
);
