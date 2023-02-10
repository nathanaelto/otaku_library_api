import { Document } from 'mongoose';

export interface IBooks extends Document {
  title: string;
  author: string;
  image: string;
  synopsis: string;
}
