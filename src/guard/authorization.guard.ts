import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      'secured',
      context.getHandler(),
    );

    if (!secured) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      throw new HttpException(
        {
          message: 'token_not_found',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const userTokenInfo = await this.tokenService.decodeToken(token);
    if (!userTokenInfo) {
      throw new HttpException(
        {
          message: userTokenInfo.message,
        },
        userTokenInfo.status,
      );
    }

    const userInfo = await this.userService.findOneById(userTokenInfo.userId);
    if (!userInfo) {
      throw new HttpException(
        {
          message: 'user_not_found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    request.user = userInfo;
    return true;
  }
}
