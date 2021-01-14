import { labMongoRepo } from 'modules/lab/repositories/implementations';
import { GetActiveLabsByExamController } from './get-active-labs-by-exam-controller';
import { GetActiveLabsByExamUseCase } from './get-active-labs-by-exam-use-case';

const getActiveLabsByExamUseCase = new GetActiveLabsByExamUseCase(labMongoRepo);
const getActiveLabsByExamController = new GetActiveLabsByExamController(
  getActiveLabsByExamUseCase,
);

export { getActiveLabsByExamUseCase, getActiveLabsByExamController };
