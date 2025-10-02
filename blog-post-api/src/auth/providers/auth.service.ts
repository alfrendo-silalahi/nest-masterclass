import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  signIn(email: string, password: string, id: number): string {
    this.usersService.getUser(id);
    return 'example token';
  }

  isAuth() {
    return true;
  }
}
