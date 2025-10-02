import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/request/create-user.request.dto';
import { UpdateUserDto } from './dtos/request/update-user.request.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { GetUserRequestDto } from './dtos/response/get-user.response.dto';

/**
 * Class to connect to users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * The constructor
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * The method to get all the users from the database
   */
  getUsers(page: number, limit: number) {
    this.authService.isAuth();
    return users;
  }

  /**
   * The method to get user by id
   */
  getUser(id: number): string {
    return `user with id ${id}`;
  }

  /**
   * The method to create new user
   */
  createUser(createUserDto: CreateUserDto): string {
    return JSON.stringify(createUserDto);
  }

  /**
   * The method to update existing user
   */
  updateUser(id: number, updateUserDto: UpdateUserDto): string {
    return `ID ${id} || ${JSON.stringify(updateUserDto)}`;
  }
}

/**
 * Temporary data for users
 */
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
