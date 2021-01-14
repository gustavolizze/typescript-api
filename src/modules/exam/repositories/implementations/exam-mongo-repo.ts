import { ReturnModelType } from '@typegoose/typegoose';
import { ExamSchema } from 'infra/database/mongoose/schemas';
import { Exam, ExamName } from 'modules/exam/domain';
import { ExamMap } from 'modules/exam/mappers';
import { ExamRepository } from '../exam-repository';

export class ExamMongoRepo implements ExamRepository {
  constructor(private readonly examModel: ReturnModelType<typeof ExamSchema>) {}

  async create(exam: Exam): Promise<void> {
    const examToPersist = ExamMap.fromDomainToPersist(exam);

    await new this.examModel(examToPersist).save();
  }

  existsByName(name: ExamName): Promise<boolean> {
    return this.examModel.exists({
      name: new RegExp(name.value, 'i'),
    });
  }
}
