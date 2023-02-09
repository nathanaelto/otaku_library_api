import { Schema } from 'mongoose';

export const ChapterSchema = new Schema(
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
