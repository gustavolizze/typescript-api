import { associationMongoRepo } from 'modules/association/repositories/implementations';
import { examMongoRepo } from 'modules/exam/repositories/implementations';
import { labMongoRepo } from 'modules/lab/repositories/implementations';
import { CreateAssociationController } from './create-association-controller';
import { CreateAssociationUseCase } from './create-association-use-case';

const createAssociationUseCase = new CreateAssociationUseCase(
  associationMongoRepo,
  examMongoRepo,
  labMongoRepo,
);
const createAssociationController = new CreateAssociationController(
  createAssociationUseCase,
);

export { createAssociationUseCase, createAssociationController };
