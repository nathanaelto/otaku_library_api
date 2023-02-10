import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetChapterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}
