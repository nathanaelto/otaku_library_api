import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IComment } from './interfaces/comment.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IUser } from '../users/interfaces/user.interface';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<IComment>,
  ) {}

  async createComment(
    comment: CreateCommentDto,
    user: IUser,
  ): Promise<CommentDto> {
    const newComment = new this.commentModel(comment);
    newComment.author = user.pseudo;
    await newComment.save();
    return new CommentDto(newComment);
  }

  async getCommentsByBookId(bookId: string): Promise<CommentDto[]> {
    const comments = await this.commentModel.find({ bookId });
    return comments.map((comment) => new CommentDto(comment));
  }
}
