import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  comment: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  bookId: string;
}
