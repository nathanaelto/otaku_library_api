import * as mongoose from 'mongoose';
import { transformValue } from '../../utils/schema.utils';

export const TokenSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, 'User can not be empty'],
    },
    token: {
      type: String,
      required: [true, 'Token can not be empty'],
    },
  },
  {
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
  },
);
