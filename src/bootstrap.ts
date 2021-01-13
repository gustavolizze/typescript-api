import { Environment } from 'environment';
import { main } from './main';
import throng from 'throng';

throng(Environment.isDev ? { start: main, workers: 1 } : { start: main });
