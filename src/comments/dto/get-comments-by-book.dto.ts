import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetCommentsByBookDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  bookId: string;
}
