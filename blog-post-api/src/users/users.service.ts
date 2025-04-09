import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/request/create-user.request.dto';
import { UpdateUserDto } from './dtos/request/update-user.request.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { GetUserRequestDto } from './dtos/response/get-user.response.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  getUsers(page: number, limit: number): GetUserRequestDto[] {
    console.log(page, limit);
    this.authService.isAuth();
    return users;
  }

  getUser(id: number): string {
    return `user with id ${id}`;
  }

  createUser(createUserDto: CreateUserDto): string {
    return JSON.stringify(createUserDto);
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): string {
    return `ID ${id} || ${JSON.stringify(updateUserDto)}`;
  }
}

const users: GetUserRequestDto[] = [
  {
    firstName: 'Alfrendo Silalahi',
    email: 'alfrendosilalahi@email.com',
  },
  {
    firstName: 'Kevin Strootman',
    email: 'kevinstrootman@email.com',
  },
];
