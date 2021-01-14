import { examMongoRepo } from 'modules/exam/repositories/implementations';
import { UpdateExamController } from './update-exam-controller';
import { UpdateExamUseCase } from './update-exam-use-case';

const updateExamUseCase = new UpdateExamUseCase(examMongoRepo);
const updateExamController = new UpdateExamController(updateExamUseCase);

export { updateExamUseCase, updateExamController };
