import { examModel } from 'infra/database/mongoose/schemas';
import { ExamMongoRepo } from './exam-mongo-repo';

const examMongoRepo = new ExamMongoRepo(examModel);

export { examMongoRepo };
