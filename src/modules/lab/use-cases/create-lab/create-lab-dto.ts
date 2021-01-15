import { JSONSchema7 } from 'json-schema';

export class CreateLabDto {
  name: string;
  address: string;
}

export const CreateLabDtoSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
  },
  required: ['name', 'address'],
};
