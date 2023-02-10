import { Document } from 'mongoose';

export interface IBooks extends Document {
  title: string;
  image: string;
  synopsis: string;
}
