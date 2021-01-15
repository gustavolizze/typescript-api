import { JSONSchema7 } from 'json-schema';

export interface LabDto {
  id: string;
  name: string;
  address: string;
  status: string;
}

export const LabDtoSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: ['active', 'inactive'],
    },
  },
  required: ['name', 'address'],
};
