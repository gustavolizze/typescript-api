import { JSONSchema7 } from 'json-schema';

export interface ExamDto {
  id: string;
  name: string;
  type: string;
  status: string;
}

export const ExamDtoSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    type: { type: 'string' },
    status: { type: 'string' },
  },
};
