import { ValidationError } from 'common/errors';
import { LabName } from './lab-name';

describe('LabName Class', () => {
  it('Deve falhar caso passar um nome null ou undefined', () => {
    const labName = LabName.create(null);

    expect(labName.isFailure()).toBeTrue();
    expect(labName.error instanceof ValidationError).toBeTrue();
    expect(labName.error.details).toEqual([
      'Você precisa informar um nome válido de no minimo 2 caracteres e no máximo 50 caracteres!',
    ]);
  });

  it('Deve falhar pois o nome não contém mais de dois caracteres', () => {
    const labName = LabName.create('A');

    expect(labName.isFailure()).toBeTrue();
    expect(labName.error instanceof ValidationError).toBeTrue();
    expect(labName.error.details).toEqual([
      'Você precisa informar um nome válido de no minimo 2 caracteres e no máximo 50 caracteres!',
    ]);
  });

  it('Deve falhar pois o nome contém mais de 50 caracteres', () => {
    const labName = LabName.create(
      'ESSE NOME VAI TER MAIS DE CINQUENTA CARACTERES OPA, AGORA FOI',
    );

    expect(labName.isFailure()).toBeTrue();
    expect(labName.error instanceof ValidationError).toBeTrue();
    expect(labName.error.details).toEqual([
      'Você precisa informar um nome válido de no minimo 2 caracteres e no máximo 50 caracteres!',
    ]);
  });

  it('Deve criar um nome', () => {
    const name = 'Lavoisier';
    const labName = LabName.create(name);

    expect(labName.isSuccess()).toBeTrue();

    const labNameValue = labName.value;

    expect(labNameValue.value).toEqual(name);
  });
});
