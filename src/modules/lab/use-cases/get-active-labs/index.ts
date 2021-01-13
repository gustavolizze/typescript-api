import { GetActiveLabsController } from './get-active-labs-controller';
import { GetActiveLabsUseCase } from './get-active-labs-use-case';
import { labMongoRepo } from 'modules/lab/repositories/implementations';

const getActiveLabsUseCase = new GetActiveLabsUseCase(labMongoRepo);
const getActiveLabsController = new GetActiveLabsController(
  getActiveLabsUseCase,
);

export { getActiveLabsUseCase, getActiveLabsController };
