import { Types } from 'mongoose';
import { UniqueEntityId } from './unique-entity-id';

describe('UniqueEntityIdClass', () => {
  test('Caso não seja passado nenhum valor ao construtor deve ser atribuido um novo id internamente', () => {
    const id = new UniqueEntityId();

    expect(id.toString()).toBeTruthy();
  });

  test('Deve atribuir um valor de id passado ao construtor', () => {
    const expectedId = new Types.ObjectId();
    const id = new UniqueEntityId(expectedId.toHexString());

    expect(id.toString()).toEqual(expectedId.toHexString());
  });
});
