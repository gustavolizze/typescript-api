import {
  prop,
  getModelForClass,
  modelOptions,
  index,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { ExamCollection } from './exam-schema';
import { LabCollection } from './lab-schema';

export const AssociationCollection = 'associations';

@modelOptions({
  options: {
    customName: AssociationCollection,
  },
})
@index({ lab: 1, exam: 1 }, { unique: true })
export class AssociationSchema {
  @prop({
    type: Types.ObjectId,
  })
  public _id: Types.ObjectId | string;

  @prop({
    type: Types.ObjectId,
    ref: LabCollection,
  })
  public lab: Types.ObjectId | string;

  @prop({
    type: Types.ObjectId,
    ref: ExamCollection,
  })
  public exam: Types.ObjectId | string;
}

export const associationModel = getModelForClass(AssociationSchema);
