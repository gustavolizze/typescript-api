import { Lab } from 'modules/lab/domain';
import { LabDto } from 'modules/lab/dto';

export interface LabRepository {
  create(input: Lab): Promise<void>;
  findById(id: string): Promise<Lab>;
  existsByName(labName: string): Promise<boolean>;
  existsById(id: string): Promise<boolean>;
  findActiveLabs(): Promise<LabDto[]>;
  delete(id: string): Promise<void>;
  update(lab: Lab): Promise<void>;
}
