import { ValidationError } from 'common/errors';
import { ExamType } from './exam-type';

describe('ExamType Class', () => {
  it('Deve falhar caso passar um tipo null ou undefined', () => {
    const examType = ExamType.create(null);

    expect(examType.isFailure()).toBeTrue();
    expect(examType.error instanceof ValidationError).toBeTrue();
    expect(examType.error.details).toEqual([
      'Você precisa informar um exame válido! (Imagem ou analise clinica)!',
    ]);
  });

  it('Não deve deixar criar um tipo inválido', () => {
    const examType = ExamType.create('abcsde');

    expect(examType.isFailure()).toBeTrue();
    expect(examType.error instanceof ValidationError).toBeTrue();
    expect(examType.error.details).toEqual([
      'Você precisa informar um exame válido! (Imagem ou analise clinica)!',
    ]);
  });

  it('Deve criar um exame do tipo "imagem"', () => {
    const examType = ExamType.image();

    expect(examType.value).toEqual('image');
  });

  it('Deve criar um exame do tipo "analise clinica"', () => {
    const examType = ExamType.clinicalAnalysis();

    expect(examType.value).toEqual('clinical-analysis');
  });

  it('Deve criar um tipo', () => {
    const examType = ExamType.create('image');

    expect(examType.isSuccess()).toBeTrue();

    const examNameValue = examType.value;

    expect(examNameValue.value).toEqual('image');
  });
});
