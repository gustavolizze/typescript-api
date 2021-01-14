import { examMongoRepo } from 'modules/exam/repositories/implementations';
import { CreateExamController } from './create-exam-controller';
import { CreateExamUseCase } from './create-exam-use-case';

const createExamUseCase = new CreateExamUseCase(examMongoRepo);
const createExamController = new CreateExamController(createExamUseCase);

export { createExamUseCase, createExamController };
