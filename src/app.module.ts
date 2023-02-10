import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationGuard } from './guard/authorization.guard';
import { TokenModule } from './token/token.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ChaptersModule } from './chapters/chapters.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [TokenModule, UsersModule, AuthModule, ChaptersModule, BooksModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AppModule {}
