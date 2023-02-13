import { IsDate, IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IComment } from '../interfaces/comment.interface';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  comment: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  bookId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  author: string;

  @IsDate()
  @IsDefined()
  @ApiProperty()
  createdAt: Date;

  constructor(comment: IComment) {
    this.id = comment._id;
    this.comment = comment.comment;
    this.bookId = comment.bookId;
    this.author = comment.author;
    this.createdAt = comment.createdAt;
  }
}
