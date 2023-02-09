import { Controller, Get, Res } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

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
}
