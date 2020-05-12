import { AllEnvironments, UniqueEnvironment } from './types';
import { merge } from 'lodash';

const DefaultEnvironment = process.env.NODE_ENV || 'dev';

const Environments: AllEnvironments = {
  all: {
    isDev: DefaultEnvironment === 'dev',
  },
  dev: {
    name: 'Development',
  },
  staging: {
    name: 'Staging',
  },
  production: {
    name: 'Production',
  },
};

export const Environment = merge(
  Environments.all,
  Environments[DefaultEnvironment] as UniqueEnvironment,
);
