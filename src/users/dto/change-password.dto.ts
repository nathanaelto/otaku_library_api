import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@Expose()
export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
