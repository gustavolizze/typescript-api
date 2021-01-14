import { associationModel, labModel } from 'infra/database/mongoose/schemas';
import { LabMongoRepo } from './lab-mongo-repo';

const labMongoRepo = new LabMongoRepo(labModel, associationModel);

export { labMongoRepo };
