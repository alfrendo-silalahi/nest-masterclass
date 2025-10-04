import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostType, PostStatus } from '../../enums/post.enum';
import { CreatePostMetaOptionsRequestDto } from './create-post-meta-options.request.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostRequestDto {
  @ApiProperty({
    description: 'This is the title for the blog post',
    example: 'This is a title',
    required: true,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
    enum: PostType,
    description: "Possible values, 'post', 'page', 'story', 'series'",
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    required: true,
    enum: PostStatus,
    description: "Possible values, 'draft', 'scheduled', 'review', 'published'",
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @ApiPropertyOptional({
    description: 'This is the content of post',
    example: 'The post content',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serializer your JSON object else a validation error will be thrown',
    example: '{\"layout\": \"default\"}',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Featured image for yout blog post',
    example: 'https://example.com/image.jpg',
  })
  @IsUrl()
  @MaxLength(1024)
  @IsOptional()
  featuredImageUrl?: string;

  // @ApiPropertyOptional({
  //   description: 'The date on which the blog post is published',
  //   example: '2025-04-10T10:00:00Z',
  // })
  // @IsISO8601()
  // @IsOptional()
  // publishOn: Date;

  @ApiPropertyOptional({
    description: 'Array of tags passed as string values',
    example: ['nestjs', 'typescript', 'blog'],
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description:
            'The key can be any string identifier for your meta option',
          example: 'sidebarEnabled',
        },
        value: {
          type: 'any',
          description: 'The value that you want to save to the key',
          example: true,
        },
      },
      required: ['key', 'value'],
    },
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsRequestDto)
  metaOptions?: CreatePostMetaOptionsRequestDto[];
}
