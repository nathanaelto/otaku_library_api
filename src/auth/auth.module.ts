import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenModule } from '../token/token.module';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TokenModule, UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
