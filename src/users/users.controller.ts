import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Put,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Authorization } from '../guard/decorators/authorization.decorator';
import { IAuthorizedRequest } from '../utils/authorized-request.interface';
import { UserDto } from './dto/user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: UserDto })
  @Authorization(true)
  @Get('/me')
  async getMe(@Req() request: IAuthorizedRequest): Promise<UserDto> {
    const { user } = request;
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return new UserDto(user);
  }

  @ApiOkResponse()
  @Authorization(true)
  @Put('/change-password')
  async changePassword(
    @Req() request: IAuthorizedRequest,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { user } = request;
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return await this.usersService.changePassword(user, changePasswordDto);
  }
}
