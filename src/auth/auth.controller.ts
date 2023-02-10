import {
  Body,
  Controller,
  HttpException,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserDto } from '../users/dto/user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { Authorization } from '../guard/decorators/authorization.decorator';
import { IAuthorizedRequest } from '../utils/authorized-request.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ type: LoginResponseDto })
  @Post('register')
  public async register(
    @Body() registerDto: RegisterDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.register(registerDto);
  }

  @ApiOkResponse({ type: LoginResponseDto })
  @Post('login')
  public async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(loginDto);
  }

  @ApiOkResponse()
  @Authorization(true)
  @Put('logout')
  public async logout(@Req() request: IAuthorizedRequest): Promise<void> {
    const { user } = request;
    if (!user) throw new HttpException('User not found', 400);
    return await this.authService.logout(user);
  }
}
