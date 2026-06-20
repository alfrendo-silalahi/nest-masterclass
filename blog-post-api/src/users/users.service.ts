import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/request/create-user.request.dto';
import { UpdateUserDto } from './dtos/request/update-user.request.dto';
import { DatabaseService } from '../database/database.service';
import User from './dtos/db/user.db.dto';
import { PoolClient } from 'pg';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async getUsers(page: number, size: number) {
    let client: PoolClient;
    try {
      client = await this.db.getPool().connect();
      const result = await client.query<User>(
        `
            select
            id,
            first_name as "firstName",
            last_name as "lastName",
            email,
            password
            from users
            limit $1 offset $2
            `,
        [size, (page - 1) * size],
      );
      return result.rows;
    } catch (err) {
      throw new Error('Failed to fetch users');
    } finally {
      if (client) client.release();
    }
  }

  async getUser(id: number) {
    let client: PoolClient;
    try {
      client = await this.db.getPool().connect();
      const result = await client.query<User>(
        `
        select
          id,
          first_name as "firstName",
          last_name as "lastName",
          email,
          password
        from users
        where id = $1
        `,
        [id],
      );
      const user = result.rows[0];
      if (!user) {
        throw new Error('User not found.');
      }
      return user;
    } catch (err) {
      if (err instanceof Error) console.log(`ERROR: ${err.message}`);
    } finally {
      if (client) client.release();
    }
  }

  async createUser(createUserDto: CreateUserDto) {}

  updateUser(id: number, updateUserDto: UpdateUserDto): string {
    return `ID ${id} || ${JSON.stringify(updateUserDto)}`;
  }
}
