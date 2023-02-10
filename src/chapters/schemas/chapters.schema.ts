import { Schema } from 'mongoose';
import { IChapters } from '../interfaces/chapters.interface';

export const ChaptersSchema = new Schema<IChapters>(
  {
    title: {
      type: String,
      required: [true, 'Title can not be empty'],
    },
    path: {
      type: String,
      required: [true, 'Path can not be empty'],
    },
    chapterNumber: {
      type: Number,
      required: [true, 'Chapter number can not be empty'],
    },
    bookId: {
      type: String,
      required: [true, 'Book id can not be empty'],
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
