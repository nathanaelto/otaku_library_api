import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Expose()
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly pseudo: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  readonly password: string;
}
