import { Entity, UniqueEntityId } from 'common/domain';

interface AssociationProps {
  exam: UniqueEntityId;
  lab: UniqueEntityId;
}

export class Association extends Entity<AssociationProps> {
  get exam() {
    return this.props.exam.value;
  }

  get lab() {
    return this.props.lab.value;
  }

  static create(props: AssociationProps) {
    return new Association(props);
  }
}
