import { SurveyModel } from '@modules/surveys/infra/mongoose/schemas/Survey';
import mongoose, { Schema } from 'mongoose';

export type UserModel = mongoose.Document & {
  name: string;
  email: string;
  password: string;
  survey: SurveyModel['_id'];
  created_at: Date;
  updated_at: Date;
};

const userSchema: Schema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  surveys: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Survey',
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model<UserModel>('User', userSchema);

export default User;
