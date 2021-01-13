import { Identifier } from './identifier';

describe('UniqueEntityId Class', () => {
  test('Deve ser instanciado', () => {
    const id = new Identifier(1);

    expect(id.value).toEqual(1);
  });

  [
    [1, 1, true],
    [1, 2, false],
    ['abc', 'abc', true],
  ].forEach(([firstValue, secondValue, expected]) => {
    test(`Deve verificar se um "Identifier" de valor ${firstValue} 
    é igual a outro "Identifier" de valor ${secondValue} e retornar ${expected}`, () => {
      const firstId = new Identifier(firstValue);
      const secondId = new Identifier(secondValue);
      const result = firstId.equals(secondId);

      expect(result).toEqual(expected);
    });
  });
});
