import { ExamSchema } from 'infra/database/mongoose/schemas';
import { Exam, ExamName } from 'modules/exam/domain';

export interface ExamRepository {
  create(exam: Exam): Promise<void>;
  existsByName(name: ExamName): Promise<boolean>;
  getActiveExams(): Promise<ExamSchema[]>;
}
