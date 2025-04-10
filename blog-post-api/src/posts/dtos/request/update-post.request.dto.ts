import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostRequestDto } from './create-post.request.dto';

export class UpdatePostRequestDto extends PartialType(CreatePostRequestDto) {
  @ApiProperty({
    description: 'The id of the post that needs to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
