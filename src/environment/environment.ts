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
    endpointTimeout: 30 * 60 * 1000, // 30 Minutos
  },
  staging: {
    name: 'Staging',
    endpointTimeout: 5 * 60 * 1000, // 5 Minutos
  },
  production: {
    name: 'Production',
    endpointTimeout: 5 * 60 * 1000, // 5 Minutos
  },
};

export const Environment = merge(
  Environments.all,
  Environments[
    DefaultEnvironment as keyof AllEnvironments
  ] as UniqueEnvironment,
);
