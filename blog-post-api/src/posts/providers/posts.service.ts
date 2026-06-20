import { Injectable } from '@nestjs/common';
import { CreatePostRequestDto } from '../dtos/request/create-post.request.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class PostsService {
  constructor(private readonly db: DatabaseService) {}

  async getPosts(page: number, size: number) {}

  async createPost(createPostRequestDto: CreatePostRequestDto) {
    console.log('Hello world!');
  }

  getPost(id: number) {
    return `User with id ${id}`;
  }
}
