import { Environment } from 'environment';
import { startApi } from './start-api';
import throng from 'throng';

throng(
  Environment.isDev ? { start: startApi, workers: 1 } : { start: startApi },
);
