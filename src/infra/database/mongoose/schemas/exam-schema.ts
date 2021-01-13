import { prop, getModelForClass } from '@typegoose/typegoose';

export class ExamSchema {
  @prop()
  public name: string;

  @prop()
  public type: string;

  @prop()
  public status: string;
}

export const examModel = getModelForClass(ExamSchema);
