import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export const LabCollection = 'labs';

@modelOptions({
  options: {
    customName: LabCollection,
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
