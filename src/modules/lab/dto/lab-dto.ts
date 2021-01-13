import { LabStatusEnum } from 'modules/lab/domain';

export interface LabDto {
  id: string;
  name: string;
  address: string;
  status: LabStatusEnum;
}
