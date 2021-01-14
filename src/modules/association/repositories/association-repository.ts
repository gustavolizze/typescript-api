import { Association } from 'modules/association/domain';

export interface AssociationRepository {
  create(input: Association): Promise<void>;
  exists(labId: string, examId: string): Promise<boolean>;
}
