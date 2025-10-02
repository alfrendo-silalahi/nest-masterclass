import { Controller, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  login(): string {
    return this.authService.signIn('alfrendo@email.com', 'password', 1);
  }
}
