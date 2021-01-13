import { Guard } from './guard';

describe('Guard Class', () => {
  it('Deve validar um argumento', () => {
    const result = Guard.executeValidators({
      argument: 'Abc',
      message: '',
      validators: [(input: any) => typeof input === 'string'],
    });

    expect(result.succeeded).toBeTrue();
  });

  it('Deve falhar na validação do argumento', () => {
    const message = 'Somente aceito numeros';
    const result = Guard.executeValidators({
      argument: 1,
      validators: [(input: any) => typeof input === 'string'],
      message,
    });

    expect(result.succeeded).toBeFalse();
    expect(result.messages).toEqual([message]);
  });

  it('Deve validar uma colecao de argumentos', () => {
    const fn = (input: any) => typeof input === 'string';

    const result = Guard.executeValidatorsBulk([
      {
        argument: 'Abc',
        message: '',
        validators: [fn],
      },
      {
        argument: 'abcdyip',
        message: '',
        validators: [fn],
      },
    ]);

    expect(result.succeeded).toBeTrue();
  });
});
