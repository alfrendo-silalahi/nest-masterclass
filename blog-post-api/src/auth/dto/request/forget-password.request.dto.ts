import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class ForgetPasswordRequest {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
