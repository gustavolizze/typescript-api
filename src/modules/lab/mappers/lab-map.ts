import { Lab, LabAddress, LabName } from 'modules/lab/domain';
import { LabDto } from 'modules/lab/dto';
import { LabSchema } from 'infra/database/mongoose/schemas';
import { EntityStatus, UniqueEntityId } from 'common/domain';
import { ResultFactory } from 'common/core';

export class LabMap {
  public static fromDomainToDto(input: Lab): LabDto {
    return {
      id: input.id.toString(),
      address: input.address,
      name: input.name,
      status: input.status.value,
    };
  }

  public static fromDomainToPersist(input: Lab): LabSchema {
    return {
      _id: input.id.value,
      address: input.address,
      name: input.name,
      status: input.status.value,
    };
  }

  public static fromPersistToDto(input: LabSchema): LabDto {
    return {
      id: `${input._id}`,
      address: input.address,
      name: input.name,
      status: input.status,
    };
  }

  public static fromPersistToDomain(input: LabSchema): Lab {
    const addressOrError = LabAddress.create(input.address);
    const nameOrError = LabName.create(input.address);
    const statusOrError = EntityStatus.create(input.status);

    if (
      ResultFactory.combine(
        addressOrError,
        nameOrError,
        statusOrError,
      ).isFailure()
    ) {
      return null;
    }

    return Lab.create(
      {
        name: nameOrError.value,
        address: addressOrError.value,
        status: statusOrError.value,
      },
      new UniqueEntityId(input._id),
    );
  }
}
