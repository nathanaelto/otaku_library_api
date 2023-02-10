import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBooks } from './interfaces/books.interface';
import { ChaptersService } from '../chapters/chapters.service';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateBookResponseDto } from './dto/create-book-response.dto';
import { GetBookChapterResponseDto } from './dto/get-book-chapter-response.dto';
import { GetBookChapterDto } from './dto/get-book-chapter.dto';
import { GetBookByIdDto } from './dto/get-book-by-id.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Books') private readonly booksModel: Model<IBooks>,
    private readonly chaptersService: ChaptersService,
  ) {}

  async createBook(
    createBookDto: CreateBookDto,
  ): Promise<CreateBookResponseDto> {
    const book = await this.booksModel.create(createBookDto);

    return {
      id: book._id,
      title: book.title,
      image: book.image,
      synopsis: book.synopsis,
    };
  }

  async getBooks(): Promise<IBooks[]> {
    return this.booksModel.find();
  }

  async getBookById(getBookByIdDto: GetBookByIdDto): Promise<IBooks> {
    return this.booksModel.findById(getBookByIdDto.id);
  }

  async getBookChapters(
    getBookChaptersDto: GetBookChapterDto,
  ): Promise<GetBookChapterResponseDto> {
    const book = await this.getBookById(getBookChaptersDto);
    if (!book) {
      throw new HttpException(
        {
          message: 'Book not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const chapters = await this.chaptersService.getChaptersByBookId(book.id);
    if (!chapters) {
      throw new HttpException(
        {
          message: 'Chapters not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return new GetBookChapterResponseDto(
      book,
      chapters.sort((a, b) => a.chapterNumber - b.chapterNumber),
    );
  }
}
