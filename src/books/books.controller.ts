import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateBookResponseDto } from './dto/create-book-response.dto';
import { Authorization } from '../guard/decorators/authorization.decorator';
import { IBooks } from './interfaces/books.interface';
import { GetBookByIdDto } from './dto/get-book-by-id.dto';
import { GetBookChapterDto } from './dto/get-book-chapter.dto';
import { GetBookChapterResponseDto } from './dto/get-book-chapter-response.dto';
import { Response } from 'express';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiCreatedResponse({
    type: CreateBookResponseDto,
  })
  @Post()
  async createBook(
    @Body() createBookDto: CreateBookDto,
  ): Promise<CreateBookResponseDto> {
    return await this.booksService.createBook(createBookDto);
  }

  @ApiOkResponse()
  @Authorization(true)
  @Get()
  async getBooks(): Promise<IBooks[]> {
    return await this.booksService.getBooks();
  }

  @ApiOkResponse()
  @Authorization(true)
  @Get(':id')
  async getBookById(@Param() getBookByIdDto: GetBookByIdDto): Promise<IBooks> {
    return await this.booksService.getBookById(getBookByIdDto);
  }

  @ApiOkResponse()
  @Authorization(true)
  @Get(':id/chapters')
  async getBookChapters(
    @Param() getBookChaptersDto: GetBookChapterDto,
  ): Promise<GetBookChapterResponseDto> {
    return await this.booksService.getBookChapters(getBookChaptersDto);
  }

  @ApiOkResponse()
  @Authorization(true)
  @Get(':id/image')
  async getBookImage(
    @Param() getBookByIdDto: GetBookByIdDto,
    @Res() res: Response,
  ) {
    const { fileName, buffer } = await this.booksService.getBookImage(
      getBookByIdDto,
    );
    const extension = fileName.split('.').pop();
    res.contentType(`image/${extension}`);
    res.attachment(fileName);
    res.send(buffer);
  }
}
