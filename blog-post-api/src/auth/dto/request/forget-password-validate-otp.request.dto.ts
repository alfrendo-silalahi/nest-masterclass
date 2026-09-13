import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class ForgetPasswordValidateOtpRequest {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  otp: string;
}
