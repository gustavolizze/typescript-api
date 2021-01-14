import { ExamSchema } from 'infra/database/mongoose/schemas';
import { Exam, ExamName } from 'modules/exam/domain';

export interface ExamRepository {
  create(exam: Exam): Promise<void>;
  delete(id: string): Promise<void>;
  update(exam: Exam): Promise<void>;
  existsByName(name: ExamName): Promise<boolean>;
  existsById(id: string): Promise<boolean>;
  getById(id: string): Promise<Exam>;
  getActiveExams(): Promise<ExamSchema[]>;
}
