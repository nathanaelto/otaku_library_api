import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { Authorization } from '../guard/decorators/authorization.decorator';
import { GetChapterDto } from './dto/get-chapter.dto';
import { IChapters } from './interfaces/chapters.interface';
import { GetChapterBufferDto } from './dto/get-chapter-buffer.dto';
import { CreateChapterDto } from './dto/create-chapter.dto';

@ApiTags('Chapters')
@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Get('default')
  getChapters(@Res() res: Response) {
    const file = this.chaptersService.getChapter();
    res.contentType('application/cbz');
    res.attachment('Chapitre_4.cbz');
    res.send(file);
  }

  @ApiCreatedResponse()
  @Post()
  async createChapter(
    @Body() createChapterDto: CreateChapterDto,
  ): Promise<IChapters> {
    return await this.chaptersService.createChapter(createChapterDto);
  }

  @ApiOkResponse()
  @Authorization(true)
  @Get(':id')
  async getChapterById(
    @Param() getChapterDto: GetChapterDto,
  ): Promise<IChapters> {
    return await this.chaptersService.getChapterById(getChapterDto);
  }

  @ApiOkResponse()
  @Authorization(true)
  @Get(':id/buffer')
  async getChapterBuffer(
    @Param() getChapterBufferDto: GetChapterBufferDto,
    @Res() res: Response,
  ) {
    const chapter = await this.chaptersService.getChapterById(
      getChapterBufferDto,
    );
    const file = await this.chaptersService.getChapterBuffer(
      getChapterBufferDto,
    );
    res.contentType('application/cbz');
    res.attachment(chapter.path.split('/').pop());
    res.send(file);
  }
}
