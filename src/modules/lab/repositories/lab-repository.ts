import { Lab } from 'modules/lab/domain';
import { LabDto } from 'modules/lab/dto';

export interface LabRepository {
  create(input?: Lab): Promise<void>;
  exists(labName: string): Promise<boolean>;
  findActiveLabs(): Promise<LabDto[]>;
}
