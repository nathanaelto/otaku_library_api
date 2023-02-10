import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetChapterBufferDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}
