import { Entity, UniqueEntityId, EntityStatus } from 'common/domain';
import { LabAddress } from '../lab-address';
import { LabName } from '../lab-name';

interface LabProps {
  name: LabName;
  address: LabAddress;
  status: EntityStatus;
}

export class Lab extends Entity<LabProps> {
  get name() {
    return this.props.name.value;
  }

  get address() {
    return this.props.address.value;
  }

  get status() {
    return this.props.status;
  }

  update(props: LabProps) {
    if (props.address) {
      this.props.address = props.address;
    }

    if (props.name) {
      this.props.name = props.name;
    }

    if (props.status) {
      this.props.status = props.status;
    }
  }

  static create(props: LabProps, id?: UniqueEntityId) {
    return new Lab(props, id);
  }
}
