import { ExamRepository } from 'modules/exam/repositories';
import { IMock, Mock, Times } from 'moq.ts';
import { GetActiveExamsUseCase } from './get-active-exams-use-case';

let repositoryMock: IMock<ExamRepository>;
let repository: ExamRepository;
let useCase: GetActiveExamsUseCase;

describe('GetActiveExamsUseCase Class', () => {
  beforeEach(() => {
    repositoryMock = new Mock<ExamRepository>()
      .setup((instance) => instance.getActiveExams())
      .returns(Promise.resolve([]));

    repository = repositoryMock.object();
    useCase = new GetActiveExamsUseCase(repository);
  });

  it('Deve retornar os laboratórios ativos', async () => {
    const result = await useCase.execute();

    expect(result).toEqual([]);
    repositoryMock.verify(
      (instance) => instance.getActiveExams(),
      Times.Once(),
    );
  });
});
