export class GetBookImageDto {
  fileName: string;
  buffer: Buffer;

  constructor(fileName: string, buffer: Buffer) {
    this.fileName = fileName;
    this.buffer = buffer;
  }
}
