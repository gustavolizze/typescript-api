import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export const ExamCollection = 'exams';

@modelOptions({
  options: {
    customName: ExamCollection,
  },
})
export class ExamSchema {
  @prop()
  public _id: Types.ObjectId;

  @prop({ unique: true })
  public name: string;

  @prop()
  public type: string;

  @prop()
  public status: string;
}

export const examModel = getModelForClass(ExamSchema);
