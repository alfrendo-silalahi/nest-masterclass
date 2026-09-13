import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import SignInRequest from './dto/request/sign-in.request.dto';
import SignUpRequest from './dto/request/sign-up.request.dto';
import ForgetPasswordRequest from './dto/request/forget-password.request.dto';
import { Public } from './decorator/public.decorator';
import SignUpResponse from './dto/response/sign-up.response.dto';
import BaseResponse from '../shared/dto/response/base.response.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('/sign-up')
  signUp(@Body() signUpRequest: SignUpRequest): Promise<SignUpResponse | undefined> {
    return this.authService.signUp(signUpRequest);
  }

  @Public()
  @Post('/sign-in')
  signIn(@Body() signInRequest: SignInRequest) {
    return this.authService.signIn(signInRequest);
  }

  @Public()
  @Post('/forget-password')
  forgetPassword(
    @Body() forgetPasswordRequest: ForgetPasswordRequest,
  ): Promise<BaseResponse<null>> {
    return this.authService.forgetPassword(forgetPasswordRequest);
  }

  @Post('/forget-password-validate-otp')
  forgetPasswordValidateOtp(
    @Body() forgetPasswordValidateOtpRequest: ForgetPasswordValidateOtpRequest,
  ): Promise<BaseResponse<null>> {
    return this.authService.forgetPasswordValidateOtp(forgetPasswordValidateOtpRequest);
  }
}
