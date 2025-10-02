import { Injectable } from '@nestjs/common';
import { CreatePostRequestDto } from '../dtos/request/create-post.request.dto';
import { UsersService } from '../../users/users.service';
import { generateSlug } from 'src/utils/slug.util';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}

  getPosts(page: number, limit: number, userId: number) {
    const user = this.usersService.getUser(userId);
    return `Posts with page ${page} and limit ${limit} from ${user}`;
  }

  createPost(createPostRequestDto: CreatePostRequestDto) {
    const slug = generateSlug(createPostRequestDto.title);
    return `New post with title ${createPostRequestDto.title} and content ${createPostRequestDto.content}`;
  }

  getPost(id: number) {
    return `User with id ${id}`;
  }
}
