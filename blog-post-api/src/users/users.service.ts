import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/request/create-user.request.dto';
import { UpdateUserDto } from './dtos/request/update-user.request.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUsers() {
    return this.usersRepository.find();
  }

  getUser(id: number): string {
    return `user with id ${id}`;
  }

  // TODO: add transaction
  async createUser(createUserDto: CreateUserDto) {
    const isEmailTaken = await this.usersRepository.existsBy({
      email: createUserDto.email,
    });

    if (isEmailTaken) {
      throw new Error('Email has already taken.');
    }

    const user = new User(
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.email,
      createUserDto.password,
    );

    await this.usersRepository.save(user);
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): string {
    return `ID ${id} || ${JSON.stringify(updateUserDto)}`;
  }
}
