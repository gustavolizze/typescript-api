import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export const AssociationCollection = 'associations';

@modelOptions({
  options: {
    customName: AssociationCollection,
  },
})
export class AssociationSchema {
  @prop({
    type: Types.ObjectId,
  })
  public _id: Types.ObjectId | string;

  @prop({
    type: Types.ObjectId,
  })
  public lab: Types.ObjectId | string;

  @prop({
    type: Types.ObjectId,
  })
  public exam: Types.ObjectId | string;
}

export const associationModel = getModelForClass(AssociationSchema);
