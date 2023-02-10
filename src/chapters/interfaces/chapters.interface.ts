import { Document } from 'mongoose';

export interface IChapters extends Document {
  title: string;
  path: string;
  chapterNumber: number;
  bookId: string;
}
