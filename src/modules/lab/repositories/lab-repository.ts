import { Lab } from 'modules/lab/domain';

export interface LabRepository {
  create(input?: Lab): Promise<void>;
  exists(labName: string): Promise<boolean>;
}
