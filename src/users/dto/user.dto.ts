import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.interface';
import { Expose } from 'class-transformer';

@Expose()
export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  pseudo: string;

  @ApiProperty()
  email: string;

  constructor(user: IUser) {
    this.id = user._id;
    this.pseudo = user.pseudo;
    this.email = user.email;
  }
}
