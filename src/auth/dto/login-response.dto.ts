import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Expose()
export class LoginResponseDto {
  @ApiProperty()
  access_token: string;
  constructor(token: string) {
    this.access_token = token;
  }
}
