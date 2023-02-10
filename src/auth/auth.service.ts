import { HttpException, Injectable } from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { RegisterDto } from './dto/register.dto';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { IUser } from '../users/interfaces/user.interface';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UsersService,
  ) {}

  async register(registerDto: RegisterDto): Promise<LoginResponseDto> {
    const emailExists = await this.userService.checkEmail(registerDto.email);
    if (emailExists) {
      throw new HttpException(
        {
          message: 'email_already_used',
        },
        400,
      );
    }

    const user = await this.userService.create(registerDto);
    if (!user) {
      throw new HttpException(
        {
          message: 'user_not_created',
        },
        500,
      );
    }
    try {
      const token = await this.tokenService.createToken(user._id);
      return new LoginResponseDto(token.token);
    } catch (e) {
      throw new HttpException(
        {
          message: 'token_not_created',
        },
        500,
      );
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const userFound = await this.userService.findOneByEmail(loginDto.email);
    if (!userFound) {
      throw new HttpException(
        {
          message: 'user_not_found',
        },
        404,
      );
    }
    if (!(await userFound.compareEncryptedPassword(loginDto.password))) {
      throw new HttpException(
        {
          message: 'wrong_password',
        },
        400,
      );
    }
    try {
      const token = await this.tokenService.createToken(userFound._id);
      return new LoginResponseDto(token.token);
    } catch (e) {
      throw new HttpException(
        {
          message: 'token_not_created',
        },
        500,
      );
    }
  }

  async logout(user: IUser): Promise<void> {
    try {
      await this.tokenService.deleteTokenForUserId(user._id);
      return Promise.resolve();
    } catch (e) {
      throw new HttpException(
        {
          message: 'token_not_deleted',
        },
        500,
      );
    }
  }
}
