import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksSchema } from './schemas/books.schema';
import { ChaptersModule } from '../chapters/chapters.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Books',
        schema: BooksSchema,
      },
    ]),
    ChaptersModule,
  ],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}
