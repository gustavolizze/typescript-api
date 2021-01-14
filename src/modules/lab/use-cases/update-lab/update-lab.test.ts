import { EntityStatus, UniqueEntityId } from 'common/domain';
import { ValidationError } from 'common/errors';
import { Lab, LabAddress, LabName } from 'modules/lab/domain';
import { LabErrors } from 'modules/lab/errors';
import { LabRepository } from 'modules/lab/repositories';
import { Types } from 'mongoose';
import { IMock, It, Mock } from 'moq.ts';
import { UpdateLabUseCase } from './update-lab-use-case';

let repositoryMock: IMock<LabRepository>;
let repository: LabRepository;
let useCase: UpdateLabUseCase;

describe('UpdateLabUseCase Class', () => {
  beforeEach(() => {
    repositoryMock = new Mock<LabRepository>()
      .setup((instance) => instance.update(It.IsAny()))
      .returns(Promise.resolve())
      .setup((instance) => instance.findById(It.IsAny()))
      .returns(
        Promise.resolve(
          Lab.create(
            {
              address: LabAddress.create('Rua dos passaros').value,
              name: LabName.create('Lavoisier').value,
              status: EntityStatus.create('active').value,
            },
            new UniqueEntityId(),
          ),
        ),
      )
      .setup((instance) => instance.findById('5fff408b649b66fcb41d0e72'))
      .returns(Promise.resolve(undefined));

    repository = repositoryMock.object();
    useCase = new UpdateLabUseCase(repository);
  });

  it('Deve retornar um ValidationError caso não seja informado nenhum parametro', async () => {
    const result = await useCase.execute(undefined);

    expect(result.isFailure()).toBeTrue();
    expect(result.error instanceof ValidationError).toBeTrue();
  });

  it('Deve retornar um LabNotFound caso o laboratório não exista', async () => {
    const result = await useCase.execute({
      id: '5fff408b649b66fcb41d0e72',
      name: 'Lavoisier',
    });

    expect(result.isFailure()).toBeTrue();
    expect(result.error instanceof LabErrors.LabNotFound).toBeTrue();
  });

  it('Deve atualizar um laboratório', async () => {
    const result = await useCase.execute({
      id: new Types.ObjectId().toHexString(),
      name: 'Lavoisier Paulista',
    });

    expect(result.isSuccess()).toBeTrue();
  });
});
