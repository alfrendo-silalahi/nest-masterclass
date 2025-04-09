import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostRequestDto } from './dtos/request/create-post.request.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('user-id', ParseIntPipe) userId: number,
  ): string {
    return this.postsService.getPosts(page, limit, userId);
  }

  @Get('/:id')
  getPost(@Param('id', ParseIntPipe) id: number): string {
    return this.postsService.getPost(id);
  }

  @Post()
  createPost(@Body() createPostRequestDto: CreatePostRequestDto): string {
    return this.postsService.createPost(createPostRequestDto);
  }
}
