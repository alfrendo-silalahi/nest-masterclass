import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/request/create-user.request.dto';
import { UpdateUserDto } from './dtos/request/update-user.request.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserRequestDto } from './dtos/response/get-user.response.dto';

@Controller('/api/v1/users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The position ot the page number that you want the API to return',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on the query',
  })
  getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): GetUserRequestDto[] {
    return this.usersService.getUsers(page, limit);
  }

  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number): string {
    return this.usersService.getUser(id);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto): string {
    return this.usersService.createUser(createUserDto);
  }

  @Patch('/:id')
  public updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): string {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
