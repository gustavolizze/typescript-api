import { Exam, ExamName } from 'modules/exam/domain';

export interface ExamRepository {
  create(exam: Exam): Promise<void>;
  existsByName(name: ExamName): Promise<boolean>;
}
