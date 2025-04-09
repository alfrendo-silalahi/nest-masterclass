import { Injectable } from '@nestjs/common';
import { CreatePostRequestDto } from '../dtos/request/create-post.request.dto';
import { UsersService } from '../../users/users.service';
import { generateSlug } from 'src/utils/slug.util';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}

  getPosts(page: number, limit: number, userId: number): string {
    const user: string = this.usersService.getUser(userId);
    return `posts with page ${page} and limit ${limit} from ${user}`;
  }

  createPost(createPostRequestDto: CreatePostRequestDto): string {
    const slug: string = generateSlug(createPostRequestDto.title);
    console.log(createPostRequestDto);
    console.log('slug', slug);
    return `new post with title ${createPostRequestDto.title} and content ${createPostRequestDto.content}`;
  }

  getPost(id: number): string {
    return `post with id ${id}`;
  }
}
