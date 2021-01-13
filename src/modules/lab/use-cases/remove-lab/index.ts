import { labMongoRepo } from 'modules/lab/repositories/implementations';
import { RemoveLabController } from './remove-lab-controller';
import { RemoveLabUseCase } from './remove-lab-use-case';

const removeLabUseCase = new RemoveLabUseCase(labMongoRepo);
const removeLabController = new RemoveLabController(removeLabUseCase);

export { removeLabUseCase, removeLabController };
