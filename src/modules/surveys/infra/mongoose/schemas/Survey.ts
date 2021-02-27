import { UserModel } from '@modules/users/infra/mongoose/schemas/User';
import mongoose, { Schema } from 'mongoose';

export type SurveyModel = mongoose.Document & {
  title: string;
  description: string;
  user: UserModel['_id'];
  created_at: Date;
  updated_at: Date;
};

const surveySchema: Schema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Survey = mongoose.model<SurveyModel>('Survey', surveySchema);

export default Survey;
