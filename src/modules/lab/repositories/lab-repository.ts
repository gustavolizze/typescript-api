import { LabSchema } from 'infra/database/mongoose/schemas';
import { Lab } from 'modules/lab/domain';
import { LabDto } from 'modules/lab/dto';

export interface LabRepository {
  create(input: Lab): Promise<void>;
  delete(id: string): Promise<void>;
  update(lab: Lab): Promise<void>;
  existsByName(labName: string): Promise<boolean>;
  existsById(id: string): Promise<boolean>;
  findActiveLabs(): Promise<LabDto[]>;
  findById(id: string): Promise<Lab>;
  findActiveLabsByExamName(examName: string): Promise<LabSchema[]>;
}
