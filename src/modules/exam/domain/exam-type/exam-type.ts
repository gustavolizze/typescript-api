import { ValueObject } from 'common/domain';
import { Guard, Result, ResultFactory } from 'common/core';
import { ValidationError } from 'common/errors';
import { isNotEmpty, isIn } from 'class-validator';

export enum ExamTypeEnum {
  Analysis = 'clinical-analysis',
  Image = 'image',
}

interface ExamTypeProps {
  type: ExamTypeEnum;
}

export class ExamType extends ValueObject<ExamTypeProps> {
  public get value() {
    return this.props.type;
  }

  static clinicalAnalysis() {
    return new ExamType({
      type: ExamTypeEnum.Analysis,
    });
  }

  static image() {
    return new ExamType({
      type: ExamTypeEnum.Image,
    });
  }

  static create(type: string): Result<ValidationError, ExamType> {
    const guard = Guard.executeValidators({
      argument: type,
      message:
        'Você precisa informar um exame válido! (Imagem ou analise clinica)!',
      validators: [
        isNotEmpty,
        (input: string) =>
          isIn(input, [ExamTypeEnum.Analysis, ExamTypeEnum.Image]),
      ],
    });

    if (guard.succeeded === false) {
      return ResultFactory.fail(new ValidationError(guard.messages));
    }

    return ResultFactory.ok(
      new ExamType({
        type: type as ExamTypeEnum,
      }),
    );
  }
}
