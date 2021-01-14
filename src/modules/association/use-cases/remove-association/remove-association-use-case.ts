import { Result, ResultFactory, UseCase } from 'common/core';
import { UniqueEntityId } from 'common/domain';
import { ValidationError } from 'common/errors';
import { AssociationErrors } from 'modules/association/errors';
import { AssociationRepository } from 'modules/association/repositories';
import { RemoveAssociationDto } from './remove-association-dto';

type Response = Result<
  ValidationError | AssociationErrors.AssociationNotFound,
  void
>;

export class RemoveAssociationUseCase
  implements UseCase<RemoveAssociationDto, Response> {
  constructor(private readonly associationRepository: AssociationRepository) {}

  async execute(input?: RemoveAssociationDto): Promise<Response> {
    const idOrError = UniqueEntityId.createAndValidate(input.id);

    if (idOrError.isFailure()) {
      return ResultFactory.fail(
        new ValidationError(['O id informado é inválido!']),
      );
    }

    const associationExists = await this.associationRepository.existsById(
      idOrError.value.toString(),
    );

    if (associationExists === false) {
      return ResultFactory.fail(new AssociationErrors.AssociationNotFound());
    }

    await this.associationRepository.delete(idOrError.value.toString());

    return ResultFactory.ok();
  }
}
