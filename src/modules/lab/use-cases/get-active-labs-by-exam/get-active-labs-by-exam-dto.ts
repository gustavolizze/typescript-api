import { JSONSchema7 } from 'json-schema';

export interface GetActiveLabsByExamDto {
  examName: string;
}

export const GetActiveLabsByExamDtoSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    examName: {
      type: 'string',
    },
  },
};
