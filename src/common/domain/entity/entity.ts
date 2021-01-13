import { UniqueEntityId } from 'common/domain/unique-entity-id';

const isEntity = (v: unknown): v is Entity<unknown> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly props: T;
  protected readonly _id?: UniqueEntityId;

  protected constructor(props: T, id?: UniqueEntityId) {
    this.props = {
      ...props,
    };
    this._id = id ? id : new UniqueEntityId();
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  public equals(object?: Entity<T>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    if (!this._id) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
