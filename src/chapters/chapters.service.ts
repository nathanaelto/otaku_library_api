import { Injectable } from '@nestjs/common';
import * as Buffer from 'buffer';
import { join } from 'path';
import * as process from 'process';
import { readFileSync } from 'fs';

@Injectable()
export class ChaptersService {
  private path = join(process.cwd(), 'storage');
  async getChapter(): Promise<Buffer> {
    const filePath = join(this.path, 'Chapitre_4.cbz');
    return readFileSync(filePath);
  }
}
