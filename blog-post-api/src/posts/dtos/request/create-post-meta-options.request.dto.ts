import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostMetaOptionsRequestDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  value: any;
}
