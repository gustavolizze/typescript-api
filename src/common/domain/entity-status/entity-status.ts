import { Guard, Result, ResultFactory } from 'common/core';
import { ValueObject } from 'common/domain/value-object';
import { isIn } from 'class-validator';
import { ValidationError } from 'common/errors';

interface EntityStatusProps {
  status: 'active' | 'inactive';
}

export class EntityStatus extends ValueObject<EntityStatusProps> {
  public get value() {
    return this.props.status;
  }

  static active() {
    return new EntityStatus({
      status: 'active',
    });
  }

  static inactive() {
    return new EntityStatus({
      status: 'inactive',
    });
  }

  static create(status?: string): Result<ValidationError, EntityStatus> {
    const guard = Guard.executeValidators({
      argument: status,
      message: 'Você precisa informar um status válido ("active", "inactive")',
      validators: [(value: string) => isIn(value, ['active', 'inactive'])],
    });

    if (guard.succeeded === false) {
      return ResultFactory.fail(new ValidationError(guard.messages));
    }

    return ResultFactory.ok(
      new EntityStatus({
        status: status as any,
      }),
    );
  }
}
