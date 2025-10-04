import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostRequestDto } from './dtos/request/create-post.request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePostRequestDto } from './dtos/request/update-post.request.dto';

@Controller('/api/v1/posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('user-id', new DefaultValuePipe(null), ParseIntPipe) userId?: number,
  ) {
    return this.postsService.getPosts();
  }

  @Get('/:id')
  getPost(@Param('id', ParseIntPipe) id: number): string {
    return this.postsService.getPost(id);
  }

  @ApiOperation({
    summary: 'Create a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is created sucessfully',
  })
  @Post()
  createPost(@Body() createPostRequestDto: CreatePostRequestDto) {
    return this.postsService.createPost(createPostRequestDto);
  }

  @ApiOperation({
    summary: 'Update an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'A 200 response if the post if updated successfully',
  })
  @Patch()
  updatePost(@Body() updatePostRequestDto: UpdatePostRequestDto) {
    console.log(updatePostRequestDto);
  }
}
