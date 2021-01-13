import { ValidationError } from 'common/errors';
import { EntityStatus } from './entity-status';

describe('EntityStatus Class', () => {
  it('Deve criar um status inativo', () => {
    const status = EntityStatus.create('inactive');

    expect(status.isSuccess()).toBeTrue();
    expect(status.value.value).toEqual('inactive');
  });

  it('Deve criar um status ativo', () => {
    const status = EntityStatus.create('active');

    expect(status.isSuccess()).toBeTrue();
    expect(status.value.value).toEqual('active');
  });

  it('Não deve deixar criar um status inválido', () => {
    const status = EntityStatus.create(undefined);

    expect(status.isFailure()).toBeTrue();
    expect(status.error instanceof ValidationError).toBeTrue();
  });
});
