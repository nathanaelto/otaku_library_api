import { Schema } from 'mongoose';
import { IComment } from '../interfaces/comment.interface';

export const CommentSchema = new Schema<IComment>(
  {
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
  },
  {
    _id: true,
    timestamps: true,
    versionKey: false,
    toObject: {
      virtuals: true,
      versionKey: false,
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  },
);
