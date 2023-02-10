import { IBooks } from '../interfaces/books.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IChapters } from '../../chapters/interfaces/chapters.interface';

export class GetBookChapterResponseDto {
  @ApiProperty()
  book: IBooks;

  @ApiProperty()
  chapters: IChapters[];

  constructor(book: IBooks, chapters: IChapters[]) {
    this.book = book;
    this.chapters = chapters;
  }
}
