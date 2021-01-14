import { associationMongoRepo } from 'modules/association/repositories/implementations';
import { RemoveAssociationController } from './remove-association-controller';
import { RemoveAssociationUseCase } from './remove-association-use-case';

const removeAssociationUseCase = new RemoveAssociationUseCase(
  associationMongoRepo,
);
const removeAssociationController = new RemoveAssociationController(
  removeAssociationUseCase,
);

export { removeAssociationUseCase, removeAssociationController };
