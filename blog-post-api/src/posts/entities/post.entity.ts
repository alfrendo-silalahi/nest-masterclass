import { PostStatus, PostType } from '../enums/post.enum';

export class Post {
  id: number;
  title: string;
  postType: PostType;
  slug: string;
  status: PostStatus;
  content?: string;
  schema?: string;
  featuredImageUrl?: string;
  publishOn: Date;
}
