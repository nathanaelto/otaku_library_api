import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChapterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  path: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  chapterNumber: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  bookId: string;
}
