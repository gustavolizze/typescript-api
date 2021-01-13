import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({
  options: {
    customName: 'labs',
  },
})
export class LabSchema {
  @prop()
  public _id: Types.ObjectId;

  @prop()
  public name: string;

  @prop()
  public address: string;

  @prop()
  public status: string;
}

export const labModel = getModelForClass(LabSchema);
