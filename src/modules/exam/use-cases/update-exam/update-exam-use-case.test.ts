import { EntityStatus, UniqueEntityId } from 'common/domain';
import { ValidationError } from 'common/errors';
import { Exam, ExamName, ExamType } from 'modules/exam/domain';
import { ExamErrors } from 'modules/exam/errors';
import { ExamRepository } from 'modules/exam/repositories';
import { Types } from 'mongoose';
import { IMock, It, Mock } from 'moq.ts';
import { UpdateExamUseCase } from './update-exam-use-case';

let repositoryMock: IMock<ExamRepository>;
let repository: ExamRepository;
let useCase: UpdateExamUseCase;

describe('UpdateExamUseCase Class', () => {
  beforeEach(() => {
    repositoryMock = new Mock<ExamRepository>()
      .setup((instance) => instance.update(It.IsAny()))
      .returns(Promise.resolve())
      .setup((instance) => instance.getById(It.IsAny()))
      .returns(
        Promise.resolve(
          Exam.create(
            {
              type: ExamType.image(),
              name: ExamName.create('Lavoisier').value,
              status: EntityStatus.create('active').value,
            },
            new UniqueEntityId(),
          ),
        ),
      )
      .setup((instance) => instance.getById('5fff408b649b66fcb41d0e72'))
      .returns(Promise.resolve(undefined));

    repository = repositoryMock.object();
    useCase = new UpdateExamUseCase(repository);
  });

  it('Deve retornar um ValidationError caso não seja informado nenhum parametro', async () => {
    const result = await useCase.execute(undefined);

    expect(result.isFailure()).toBeTrue();
    expect(result.error instanceof ValidationError).toBeTrue();
  });

  it('Deve retornar um ExamNotFound caso o exame não exista', async () => {
    const result = await useCase.execute({
      id: '5fff408b649b66fcb41d0e72',
      name: 'Exame do coracao',
    });

    expect(result.isFailure()).toBeTrue();
    expect(result.error instanceof ExamErrors.ExamNotFound).toBeTrue();
  });

  it('Deve atualizar um exame', async () => {
    const result = await useCase.execute({
      id: new Types.ObjectId().toHexString(),
      name: 'Exame do coracao',
    });

    expect(result.isSuccess()).toBeTrue();
  });
});
