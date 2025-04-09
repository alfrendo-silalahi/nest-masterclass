import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostType, PostStatus } from '../../enums/post.enum';
import { CreatePostMetaOptionsRequestDto } from './create-post-meta-options.request.dto';
import { Type } from 'class-transformer';

export class CreatePostRequestDto {
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @IsString()
  @IsOptional()
  content?: string;

  @IsJSON()
  @IsOptional()
  schema?: string;

  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsRequestDto)
  metaOptions?: CreatePostMetaOptionsRequestDto[];
}
