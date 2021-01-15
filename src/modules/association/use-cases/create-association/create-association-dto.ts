import { JSONSchema7 } from 'json-schema';

export interface CreateAssociationDto {
  lab: string;
  exam: string;
}

export const CreateAssociationDtoSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    lab: { type: 'string' },
    exam: { type: 'string' },
  },
};
