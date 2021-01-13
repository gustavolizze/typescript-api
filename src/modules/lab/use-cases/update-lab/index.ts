import { labMongoRepo } from 'modules/lab/repositories/implementations';
import { UpdateLabController } from './update-lab-controller';
import { UpdateLabUseCase } from './update-lab-use-case';

const updateLabUseCase = new UpdateLabUseCase(labMongoRepo);
const updateLabController = new UpdateLabController(updateLabUseCase);

export { updateLabUseCase, updateLabController };
