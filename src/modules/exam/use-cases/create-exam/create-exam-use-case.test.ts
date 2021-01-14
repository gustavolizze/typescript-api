import { CreateExamUseCase } from './create-exam-use-case';
import { Mock, IMock, Times, It } from 'moq.ts';
import { ExamRepository } from 'modules/exam/repositories';
import { ExamName } from 'modules/exam/domain';
import { ExamErrors } from 'modules/exam/errors';

let repositoryMock: IMock<ExamRepository>;
let repository: ExamRepository;
let useCase: CreateExamUseCase;

const examName = ExamName.create('repetido').value;

describe('CreateExamUseCase Class', () => {
  beforeEach(() => {
    repositoryMock = new Mock<ExamRepository>()
      .setup((instance) =>
        instance.existsByName(
          It.Is((expression: any) => expression.value === examName.value),
        ),
      )
      .returns(Promise.resolve(true))
      .setup((instance) => instance.create(It.IsAny()))
      .returns(Promise.resolve());

    repository = repositoryMock.object();
    useCase = new CreateExamUseCase(repository);
  });

  it('Deve retornar um erro do tipo "ExamAlreadyExists"', async () => {
    const result = await useCase.execute({
      name: examName.value,
      type: 'image',
    });

    expect(result.isFailure()).toBeTrue();
    expect(result.error instanceof ExamErrors.ExamAlreadyExists).toBeTrue();
  });

  it('Deve criar um exam', async () => {
    const result = await useCase.execute({
      name: 'Lavoisier',
      type: 'image',
    });

    repositoryMock.verify((instance) => instance.create, Times.Once());
    expect(result.isSuccess()).toBeTrue();
    expect(result.value.id).toBeTruthy();
  });
});
