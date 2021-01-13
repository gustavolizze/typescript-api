export class Identifier<T> {
  constructor(private readonly _value: T) {}

  equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toValue() === this._value;
  }

  get value(): T {
    return this._value;
  }

  toString(): string {
    return `${this._value}`;
  }

  toValue(): T {
    return this._value;
  }
}
