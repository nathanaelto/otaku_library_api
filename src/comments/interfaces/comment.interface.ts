import { Document } from 'mongoose';

export class IComment extends Document {
  comment: string;

  author: string;

  bookId: string;

  createdAt: Date;
}
