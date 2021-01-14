import { ExamSchema } from 'infra/database/mongoose/schemas';
import { Exam } from 'modules/exam/domain';
import { ExamDto } from 'modules/exam/dto';

export class ExamMap {
  static fromDomainToDto(input: Exam): ExamDto {
    return {
      id: input.id.toString(),
      name: input.name,
      type: input.type,
      status: input.status,
    };
  }

  static fromDomainToPersist(input: Exam): ExamSchema {
    return {
      _id: input.id.value,
      name: input.name,
      status: input.status,
      type: input.type,
    };
  }

  static fromPersistToDto(input: ExamSchema): ExamDto {
    return {
      id: `${input._id}`,
      name: input.name,
      status: input.status,
      type: input.type,
    };
  }
}
