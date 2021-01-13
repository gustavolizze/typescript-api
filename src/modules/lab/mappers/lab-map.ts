import { Lab } from 'modules/lab/domain';
import { LabDto } from 'modules/lab/dto';
import { LabSchema } from 'infra/database/mongoose/schemas';

export class LabMap {
  public static fromDomainToDto(input: Lab): LabDto {
    return {
      id: input.id.toString(),
      address: input.address,
      name: input.name,
      status: input.status,
    };
  }

  public static fromDomainToPersist(input: Lab): LabSchema {
    return {
      _id: input.id.value,
      address: input.address,
      name: input.name,
      status: input.status,
    };
  }
}
