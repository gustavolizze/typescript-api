import { examMongoRepo } from 'modules/exam/repositories/implementations';
import { RemoveExamController } from './remove-exam-controller';
import { RemoveExamUseCase } from './remove-exam-use-case';

const removeExamUseCase = new RemoveExamUseCase(examMongoRepo);
const removeExamController = new RemoveExamController(removeExamUseCase);

export { removeExamUseCase, removeExamController };
