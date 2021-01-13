import { ValidationError } from 'common/errors';
import { LabErrors } from 'modules/lab/errors';
import { LabRepository } from 'modules/lab/repositories';
import { Types } from 'mongoose';
import { IMock, It, Mock } from 'moq.ts';
import { RemoveLabUseCase } from './remove-lab-use-case';

let repositoryMock: IMock<LabRepository>;
let repository: LabRepository;
let useCase: RemoveLabUseCase;

describe('RemoveLabUseCase Class', () => {
  beforeEach(() => {
    repositoryMock = new Mock<LabRepository>()
      .setup((instance) => instance.delete(It.IsAny()))
      .returns(Promise.resolve())
      .setup((instance) => instance.existsById(It.IsAny()))
      .returns(Promise.resolve(true))
      .setup((instance) => instance.existsById('5fff408b649b66fcb41d0e72'))
      .returns(Promise.resolve(false));

    repository = repositoryMock.object();
    useCase = new RemoveLabUseCase(repository);
  });

  it('Deve retornar um ValidationError caso informado um id inválido', async () => {
    const result = await useCase.execute(undefined);

    expect(result.isFailure()).toBeTrue();
    expect(result.error instanceof ValidationError).toBeTrue();
  });

  it('Deve retornar um LabNotFound caso o laboratório não exista', async () => {
    const result = await useCase.execute({
      id: '5fff408b649b66fcb41d0e72',
    });

    expect(result.isFailure()).toBeTrue();
    expect(result.error instanceof LabErrors.LabNotFound).toBeTrue();
  });

  it('Deve deletar um laboratório', async () => {
    const result = await useCase.execute({
      id: new Types.ObjectId().toHexString(),
    });

    expect(result.isSuccess()).toBeTrue();
  });
});
