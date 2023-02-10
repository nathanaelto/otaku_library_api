import { Schema } from 'mongoose';
import { IBooks } from '../interfaces/books.interface';

export const BooksSchema = new Schema<IBooks>(
  {
    title: {
      type: String,
      required: [true, 'Title can not be empty'],
    },
    image: {
      type: String,
      required: [true, 'Image can not be empty'],
    },
    synopsis: {
      type: String,
      required: [true, 'Synopsis can not be empty'],
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
