import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetBookByIdDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}
