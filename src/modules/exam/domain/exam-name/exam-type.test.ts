import { ValidationError } from 'common/errors';
import { ExamName } from './exam-name';

describe('ExamName Class', () => {
  it('Deve falhar caso passar um nome null ou undefined', () => {
    const examName = ExamName.create(null);

    expect(examName.isFailure()).toBeTrue();
    expect(examName.error instanceof ValidationError).toBeTrue();
    expect(examName.error.details).toEqual([
      'Você precisa informar um nome válido de no minimo 2 caracteres e no máximo 50 caracteres!',
    ]);
  });

  it('Deve falhar pois o nome não contém mais de dois caracteres', () => {
    const examName = ExamName.create('A');

    expect(examName.isFailure()).toBeTrue();
    expect(examName.error instanceof ValidationError).toBeTrue();
    expect(examName.error.details).toEqual([
      'Você precisa informar um nome válido de no minimo 2 caracteres e no máximo 50 caracteres!',
    ]);
  });

  it('Deve falhar pois o nome contém mais de 50 caracteres', () => {
    const examName = ExamName.create(
      'ESSE NOME VAI TER MAIS DE CINQUENTA CARACTERES OPA, AGORA FOI',
    );

    expect(examName.isFailure()).toBeTrue();
    expect(examName.error instanceof ValidationError).toBeTrue();
    expect(examName.error.details).toEqual([
      'Você precisa informar um nome válido de no minimo 2 caracteres e no máximo 50 caracteres!',
    ]);
  });

  it('Deve criar um nome', () => {
    const nome = 'Exame de coracao';
    const examName = ExamName.create(nome);

    expect(examName.isSuccess()).toBeTrue();

    const examNameValue = examName.value;

    expect(examNameValue.value).toEqual(nome);
  });
});
