import { Mock, IMock, Times, It } from 'moq.ts';
import { ExamRepository } from 'modules/exam/repositories';
import { ExamErrors } from 'modules/exam/errors';
import { CreateAssociationUseCase } from './create-association-use-case';
import { LabRepository } from 'modules/lab/repositories';
import { AssociationRepository } from 'modules/association/repositories';
import { LabErrors } from 'modules/lab/errors';
import { AssociationErrors } from 'modules/association/errors';
import { Lab, LabAddress, LabName } from 'modules/lab/domain';
import { EntityStatus, UniqueEntityId } from 'common/domain';
import { Exam, ExamName, ExamType } from 'modules/exam/domain';
import { Types } from 'mongoose';

let examMock: IMock<ExamRepository>;
let labMock: IMock<LabRepository>;
let associationMock: IMock<AssociationRepository>;
let examRepository: ExamRepository;
let labRepository: LabRepository;
let associationRepository: AssociationRepository;
let useCase: CreateAssociationUseCase;

describe('CreateAssociationUseCase Class', () => {
  beforeEach(() => {
    examMock = new Mock<ExamRepository>()
      .setup((instance) => instance.getById(It.IsAny()))
      .returns(
        Promise.resolve(
          Exam.create({
            name: ExamName.create('Exame do coracao').value,
            type: ExamType.clinicalAnalysis(),
            status: EntityStatus.active(),
          }),
        ),
      )
      .setup((instance) => instance.getById('6000b03ac768356187bd879a'))
      .returns(Promise.resolve(undefined))
      .setup((instance) => instance.getById('6000aaf7b8d04956da358cc7'))
      .returns(
        Promise.resolve(
          Exam.create(
            {
              name: ExamName.create('Exame do coracao').value,
              type: ExamType.clinicalAnalysis(),
              status: EntityStatus.active(),
            },
            new UniqueEntityId('6000aaf7b8d04956da358cc7'),
          ),
        ),
      );

    labMock = new Mock<LabRepository>()
      .setup((instance) => instance.findById(It.IsAny()))
      .returns(
        Promise.resolve(
          Lab.create({
            name: LabName.create('Lavoisier').value,
            address: LabAddress.create('Rua dos passaros').value,
            status: EntityStatus.active(),
          }),
        ),
      )
      .setup((instance) => instance.findById('6000a8c7a69beb1ef1287c80'))
      .returns(Promise.resolve(undefined))
      .setup((instance) => instance.findById('6000aae90ef7c9989af3b125'))
      .returns(
        Promise.resolve(
          Lab.create(
            {
              name: LabName.create('Lavoisier').value,
              address: LabAddress.create('Rua dos passaros').value,
              status: EntityStatus.active(),
            },
            new UniqueEntityId('6000aae90ef7c9989af3b125'),
          ),
        ),
      );

    associationMock = new Mock<AssociationRepository>()
      .setup((instance) => instance.exists(It.IsAny(), It.IsAny()))
      .returns(Promise.resolve(false))
      .setup((instance) =>
        instance.exists('6000aae90ef7c9989af3b125', '6000aaf7b8d04956da358cc7'),
      )
      .returns(Promise.resolve(true))
      .setup((instance) => instance.create(It.IsAny()))
      .returns(Promise.resolve());

    examRepository = examMock.object();
    labRepository = labMock.object();
    associationRepository = associationMock.object();

    useCase = new CreateAssociationUseCase(
      associationRepository,
      examRepository,
      labRepository,
    );
  });

  it('Deve retornar um erro do tipo "LabNotFound"', async () => {
    const result = await useCase.execute({
      exam: '6000a8c7a69beb1ef1287c80',
      lab: '6000a8c7a69beb1ef1287c80',
    });

    expect(result.isFailure()).toBeTrue();
    expect(result.error instanceof LabErrors.LabNotFound).toBeTrue();
  });

  it('Deve retornar um erro do tipo "ExamNotFound"', async () => {
    const result = await useCase.execute({
      exam: '6000b03ac768356187bd879a',
      lab: new Types.ObjectId().toHexString(),
    });

    expect(result.isFailure()).toBeTrue();
    expect(result.error instanceof ExamErrors.ExamNotFound).toBeTrue();
  });

  it('Deve retornar um erro do tipo "AssociationAlreadyExists"', async () => {
    const result = await useCase.execute({
      exam: '6000aaf7b8d04956da358cc7',
      lab: '6000aae90ef7c9989af3b125',
    });

    expect(result.isFailure()).toBeTrue();
    expect(
      result.error instanceof AssociationErrors.AssociationAlreadyExists,
    ).toBeTrue();
  });

  it('Deve criar uma associação', async () => {
    const result = await useCase.execute({
      exam: new Types.ObjectId().toHexString(),
      lab: new Types.ObjectId().toHexString(),
    });

    expect(result.isSuccess()).toBeTrue();
    associationMock.verify((instance) => instance.create, Times.Once());
  });
});
