import { CreateLabUseCase } from './create-lab-use-case';
import { LabRepository } from 'modules/lab/repositories';
import { Mock, IMock, Times } from 'moq.ts';
import { LabErrors } from 'modules/lab/errors';

let repositoryMock: IMock<LabRepository>;
let repository: LabRepository;
let useCase: CreateLabUseCase;

describe('CreateLabUseCase Class', () => {
  beforeEach(() => {
    repositoryMock = new Mock<LabRepository>()
      .setup((instance) => instance.existsByName('Repetido'))
      .returns(Promise.resolve(true))
      .setup((instance) => instance.create())
      .returns(Promise.resolve());

    repository = repositoryMock.object();
    useCase = new CreateLabUseCase(repository);
  });

  it('Deve retornar um erro do tipo "LabAlreadyExists"', async () => {
    const result = await useCase.execute({
      name: 'Repetido',
      address: 'Rua do amor, numero 13',
    });

    expect(result.isFailure()).toBeTrue();
    expect(result.error instanceof LabErrors.LabAlreadyExists).toBeTrue();
  });

  it('Deve criar um laboratório', async () => {
    const result = await useCase.execute({
      name: 'Lavoisier',
      address: 'Rua do amor, numero 13',
    });

    repositoryMock.verify((instance) => instance.create, Times.Once());
    expect(result.isSuccess()).toBeTrue();
    expect(result.value.id).toBeTruthy();
  });
});
