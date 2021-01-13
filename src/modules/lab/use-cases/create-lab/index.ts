import { CreateLabController } from './create-lab-controller';
import { CreateLabUseCase } from './create-lab-use-case';
import { labMongoRepo } from 'modules/lab/repositories/implementations';

const createLabUseCase = new CreateLabUseCase(labMongoRepo);
const createLabController = new CreateLabController(createLabUseCase);

export { createLabUseCase, createLabController };
