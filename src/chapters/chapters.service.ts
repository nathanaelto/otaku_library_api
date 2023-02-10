import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as Buffer from 'buffer';
import { join } from 'path';
import * as process from 'process';
import { readFileSync } from 'fs';
import { InjectModel } from '@nestjs/mongoose';
import { IChapters } from './interfaces/chapters.interface';
import { Model } from 'mongoose';
import { GetChapterBufferDto } from './dto/get-chapter-buffer.dto';
import { GetChapterDto } from './dto/get-chapter.dto';
import { CreateChapterDto } from './dto/create-chapter.dto';

@Injectable()
export class ChaptersService {
  private path = join(process.cwd(), 'storage');

  constructor(
    @InjectModel('Chapters') private readonly chaptersModel: Model<IChapters>,
  ) {}

  async createChapter(createChapterDto: CreateChapterDto): Promise<IChapters> {
    const createdChapter = new this.chaptersModel(createChapterDto);
    return createdChapter.save();
  }
  async getChapter(): Promise<Buffer> {
    const filePath = join(this.path, 'Chapitre_4.cbz');
    return readFileSync(filePath);
  }

  async getChaptersByBookId(bookId: string): Promise<IChapters[]> {
    return this.chaptersModel.find({ bookId });
  }

  async getChapterById(getChapterDto: GetChapterDto): Promise<IChapters> {
    return this.chaptersModel.findById(getChapterDto.id);
  }

  async getChapterBuffer(
    getChapterBufferDto: GetChapterBufferDto,
  ): Promise<Buffer> {
    const chapter = await this.getChapterById(getChapterBufferDto);
    if (!chapter) {
      throw new HttpException(
        {
          message: 'Chapter not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const filePath = join(this.path, chapter.path);
    return readFileSync(filePath);
  }
}
