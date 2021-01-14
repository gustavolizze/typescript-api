import { ResultFactory } from 'common/core';
import { EntityStatus, UniqueEntityId } from 'common/domain';
import { ExamSchema } from 'infra/database/mongoose/schemas';
import { Exam, ExamName, ExamType } from 'modules/exam/domain';
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

  static fromPersistToDomain(input: ExamSchema): Exam {
    const nameOrError = ExamName.create(input.name);
    const typeOrError = ExamType.create(input.type);
    const statusOrError = EntityStatus.create(input.status);

    const validation = ResultFactory.combine(
      nameOrError,
      typeOrError,
      statusOrError,
    );

    if (validation.isFailure()) {
      return null;
    }

    return Exam.create(
      {
        name: nameOrError.value,
        type: typeOrError.value,
        status: statusOrError.value,
      },
      new UniqueEntityId(input._id),
    );
  }
}
