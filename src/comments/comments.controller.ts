import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Authorization } from '../guard/decorators/authorization.decorator';
import { IAuthorizedRequest } from '../utils/authorized-request.interface';
import { CommentDto } from './dto/comment.dto';
import { GetCommentsByBookDto } from './dto/get-comments-by-book.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Authorization(true)
  @ApiCreatedResponse()
  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Req() request: IAuthorizedRequest,
  ): Promise<CommentDto> {
    const { user } = request;
    return await this.commentsService.createComment(createCommentDto, user);
  }

  @ApiOkResponse()
  @Authorization(true)
  @Get(':bookId')
  async getCommentsByBookId(
    @Param() getCommentsByBookDto: GetCommentsByBookDto,
  ): Promise<CommentDto[]> {
    return await this.commentsService.getCommentsByBookId(
      getCommentsByBookDto.bookId,
    );
  }
}
