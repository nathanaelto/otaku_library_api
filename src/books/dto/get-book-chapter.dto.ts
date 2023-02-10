import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetBookChapterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}
