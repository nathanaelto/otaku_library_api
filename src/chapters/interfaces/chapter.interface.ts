import { Document } from 'mongoose';

export interface IChapter extends Document {
  title: string;
  path: string;
  chapterNumber: number;
}
