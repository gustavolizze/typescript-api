import { cloneDeep } from 'lodash';

export abstract class ValueObject<Props> {
  protected readonly props: Props;

  protected constructor(props: Props) {
    this.props = cloneDeep(props);
  }

  public equals(vo?: ValueObject<Props>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }

    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract get value(): any;
}
