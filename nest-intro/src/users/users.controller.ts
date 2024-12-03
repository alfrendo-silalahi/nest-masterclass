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
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): string {
    return this.usersService.getUsers();
  }

  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number): string {
    return `user with id ${id}`;
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto): string {
    console.log(createUserDto instanceof CreateUserDto);
    return 'create user';
  }

  @Patch('/:id')
  public updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): string {
    console.log(updateUserDto);
    return 'Update user successfully';
  }
}
