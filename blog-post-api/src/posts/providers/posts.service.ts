import { Injectable } from '@nestjs/common';
import { CreatePostRequestDto } from '../dtos/request/create-post.request.dto';
import { generateSlug } from 'src/utils/slug.util';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  getPosts() {
    return this.postsRepository.find();
  }

  createPost(createPostRequestDto: CreatePostRequestDto) {
    const slug = generateSlug(createPostRequestDto.title);

    const post = new Post();
    post.title = createPostRequestDto.title;
    post.postType = createPostRequestDto.postType;
    post.slug = slug;
    post.status = createPostRequestDto.status;
    post.content = createPostRequestDto.content;
    post.schema = createPostRequestDto.schema;
    post.publishOn = new Date();

    this.postsRepository.save(post);
  }

  getPost(id: number) {
    return `User with id ${id}`;
  }
}
