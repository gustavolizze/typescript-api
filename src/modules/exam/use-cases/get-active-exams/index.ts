import { examMongoRepo } from 'modules/exam/repositories/implementations';
import { GetActiveExamsController } from './get-active-exams-controller';
import { GetActiveExamsUseCase } from './get-active-exams-use-case';

const getActiveExamsUseCase = new GetActiveExamsUseCase(examMongoRepo);
const getActiveExamsController = new GetActiveExamsController(
  getActiveExamsUseCase,
);

export { getActiveExamsUseCase, getActiveExamsController };
