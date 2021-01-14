import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({
  options: {
    customName: 'exams',
  },
})
export class ExamSchema {
  @prop()
  public _id: Types.ObjectId;

  @prop()
  public name: string;

  @prop()
  public type: string;

  @prop()
  public status: string;
}

export const examModel = getModelForClass(ExamSchema);
