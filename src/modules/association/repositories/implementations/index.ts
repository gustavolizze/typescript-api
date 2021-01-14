import { associationModel } from 'infra/database/mongoose/schemas';
import { AssociationMongoRepo } from './association-mongo-repo';

const associationMongoRepo = new AssociationMongoRepo(associationModel);

export { associationMongoRepo };
