import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostStatus, PostType } from '../enums/post.enum';

@Entity({
  name: 'posts',
})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
  })
  title: string;

  @Column({
    name: 'post_type',
    type: 'varchar',
    length: 20,
    default: PostType.POST,
  })
  postType: PostType;

  @Column({
    type: 'varchar',
    length: 256,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'varchar',
    default: PostStatus.DRAFT,
  })
  status: PostStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    name: 'featured_image_url',
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    name: 'publish_on',
    type: 'timestamp',
  })
  publishOn: Date;

  // TODO
  // tags?: string[];

  // @Column({
  //   name: 'meta_options',
  // })
  // metaOptions?: CreatePostMetaOptionsRequestDto;
}
