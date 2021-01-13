import { Entity, UniqueEntityId } from 'common/domain';
import { LabStatusEnum } from './lab-status';
import { LabAddress } from '../lab-address';
import { LabName } from '../lab-name';

interface LabProps {
  name: LabName;
  address: LabAddress;
  status: LabStatusEnum;
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

  static create(props: LabProps, id?: UniqueEntityId) {
    return new Lab(props, id);
  }
}
