import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import SignInRequest from '../dto/request/sign-in.request.dto';
import SignUpRequest from '../dto/request/sign-up.request.dto';
import { DatabaseService } from 'src/database/database.service';
import { PoolClient } from 'pg';
import * as bcrypt from 'bcryptjs';
import SignInResponse from '../dto/response/sign-in.response.dto';
import BaseResponse from 'src/shared/dto/response/base.response.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import SignUpResponse from '../dto/response/sign-up.response.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly ds: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpRequest: SignUpRequest): Promise<SignUpResponse> {
    let client: PoolClient;

    try {
      client = await this.ds.getPool().connect();

      // check if email is exists
      const checkEmailResult = await client.query(
        `select exists (
          select 1
          from users
          where email = $1
        ) as exists`,
        [signUpRequest.email],
      );

      if (checkEmailResult.rows[0].exists) throw new BadRequestException('Email already taken!');

      // hash the password
      const hashedPassword = await bcrypt.hash(signUpRequest.password, 10);

      await client.query(
        `
        insert into users (first_name, last_name, email, password)
        values ($1, $2, $3, $4)
        `,
        [signUpRequest.firstName, signUpRequest.lastName, signUpRequest.email, hashedPassword],
      );

      return {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        expiresIn: 1200,
        user: null,
      };
    } catch (err) {
      if (err instanceof HttpException) {
        this.logger.error(err.message);
        throw err;
      }
      if (err instanceof Error) {
        this.logger.error(err.message);
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } finally {
      if (client) client.release();
    }
  }

  async signIn(signInRequest: SignInRequest): Promise<BaseResponse<SignInResponse>> {
    let client: PoolClient;
    try {
      client = await this.ds.getPool().connect();

      const response = await client.query<{
        id: number;
        firstName: string;
        email: string;
        password: string;
        role: string;
      }>(
        `
        select id,
        first_name as firstName,
        email,
        password
        from users
        where email = $1
        `,
        [signInRequest.email],
      );

      if (response.rowCount != 1)
        throw new HttpException('Invalid email or password.', HttpStatus.UNAUTHORIZED);
      const user = response.rows[0];

      const passwordValid = await bcrypt.compare(signInRequest.password, user.password);
      if (!passwordValid) {
        throw new HttpException('Invalid email or password.', HttpStatus.UNAUTHORIZED);
      }

      // create jwt token
      const token = await this.jwtService.signAsync(
        {
          id: user.id,
          name: user.firstName,
          email: user.email,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '1h',
        },
      );

      return {
        success: true,
        message: 'Sign in success.',
        data: {
          accessToken: token,
          refreshToken: 'rf token',
          expiresIn: 900,
          user: {
            id: user.id,
            name: user.firstName,
            email: user.email,
            role: 'user',
          },
        },
      };
    } catch (err) {
      throw new HttpException('Internal server error.', HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      if (client) client.release();
    }
  }
}
