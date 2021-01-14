import { ValidationError } from 'common/errors';
import { ExamErrors } from 'modules/exam/errors';
import { ExamRepository } from 'modules/exam/repositories';
import { Types } from 'mongoose';
import { IMock, It, Mock } from 'moq.ts';
import { RemoveExamUseCase } from './remove-exam-use-case';

let repositoryMock: IMock<ExamRepository>;
let repository: ExamRepository;
let useCase: RemoveExamUseCase;

describe('RemoveLabUseCase Class', () => {
  beforeEach(() => {
    repositoryMock = new Mock<ExamRepository>()
      .setup((instance) => instance.delete(It.IsAny()))
      .returns(Promise.resolve())
      .setup((instance) => instance.existsById(It.IsAny()))
      .returns(Promise.resolve(true))
      .setup((instance) => instance.existsById('5fff408b649b66fcb41d0e72'))
      .returns(Promise.resolve(false));

    repository = repositoryMock.object();
    useCase = new RemoveExamUseCase(repository);
  });

  it('Deve retornar um ValidationError caso informado um id inválido', async () => {
    const result = await useCase.execute(undefined);

    expect(result.isFailure()).toBeTrue();
    expect(result.error instanceof ValidationError).toBeTrue();
  });

  it('Deve retornar um ExamNotFound caso o exame não exista', async () => {
    const result = await useCase.execute({
      id: '5fff408b649b66fcb41d0e72',
    });

    expect(result.isFailure()).toBeTrue();
    expect(result.error instanceof ExamErrors.ExamNotFound).toBeTrue();
  });

  it('Deve deletar um exame', async () => {
    const result = await useCase.execute({
      id: new Types.ObjectId().toHexString(),
    });

    expect(result.isSuccess()).toBeTrue();
  });
});
