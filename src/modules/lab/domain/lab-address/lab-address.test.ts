import { ValidationError } from 'common/errors';
import { LabAddress } from './lab-address';

describe('LabAddress Class', () => {
  it('Deve falhar caso passar um endereço null ou undefined', () => {
    const labAddress = LabAddress.create(null);

    expect(labAddress.isFailure()).toBeTrue();
    expect(labAddress.error instanceof ValidationError).toBeTrue();
    expect(labAddress.error.details).toEqual([
      'Você precisa informar um endereço válido de no minimo 2 caracteres e no máximo 50 caracteres!',
    ]);
  });

  it('Deve falhar pois o endereço não contém mais de dois caracteres', () => {
    const labAddress = LabAddress.create('A');

    expect(labAddress.isFailure()).toBeTrue();
    expect(labAddress.error instanceof ValidationError).toBeTrue();
    expect(labAddress.error.details).toEqual([
      'Você precisa informar um endereço válido de no minimo 2 caracteres e no máximo 50 caracteres!',
    ]);
  });

  it('Deve falhar pois o endereço contém mais de 50 caracteres', () => {
    const labAddress = LabAddress.create(
      'ESSE NOME VAI TER MAIS DE CINQUENTA CARACTERES OPA, AGORA FOI',
    );

    expect(labAddress.isFailure()).toBeTrue();
    expect(labAddress.error instanceof ValidationError).toBeTrue();
    expect(labAddress.error.details).toEqual([
      'Você precisa informar um endereço válido de no minimo 2 caracteres e no máximo 50 caracteres!',
    ]);
  });

  it('Deve criar um endereço', () => {
    const address = 'Rua dos passaros, numero 67';
    const labAddress = LabAddress.create(address);

    expect(labAddress.isSuccess()).toBeTrue();

    const labAddressValue = labAddress.value;

    expect(labAddressValue.value).toEqual(address);
  });
});
