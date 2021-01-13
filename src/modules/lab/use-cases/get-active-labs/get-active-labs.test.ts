import { LabRepository } from 'modules/lab/repositories';
import { IMock, Mock, Times } from 'moq.ts';
import { GetActiveLabsUseCase } from './get-active-labs-use-case';

let repositoryMock: IMock<LabRepository>;
let repository: LabRepository;
let useCase: GetActiveLabsUseCase;

describe('GetActiveLabsUseCase Class', () => {
  beforeEach(() => {
    repositoryMock = new Mock<LabRepository>()
      .setup((instance) => instance.findActiveLabs())
      .returns(Promise.resolve([]));

    repository = repositoryMock.object();
    useCase = new GetActiveLabsUseCase(repository);
  });

  it('Deve retornar os laboratórios ativos', async () => {
    const result = await useCase.execute();

    expect(result.isSuccess()).toBeTrue();
    expect(result.value).toEqual([]);
    repositoryMock.verify(
      (instance) => instance.findActiveLabs(),
      Times.Once(),
    );
  });
});
