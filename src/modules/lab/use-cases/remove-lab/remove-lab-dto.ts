import { JSONSchema7 } from 'json-schema';

export interface RemoveLabDto {
  id: string;
}

export const RemoveLabDtoSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
};
