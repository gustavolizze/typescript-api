export interface CreateExamDto {
  name: string;
  type: string;
}

export const CreateExamDtoSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    type: { type: 'string' },
  },
};
