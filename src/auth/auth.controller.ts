import { Body, Controller, Put, Request, UseGuards } from '@nestjs/common';
import { Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SigninDTO,
  SignupDTO,
  UpdateDTO,
} from './authValidation/auth.validation';
import { AuthGuard } from '../common/guards/auth.guard';
import { User } from 'src/schemas/user.schema';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() body: SignupDTO): Promise<object | undefined> {
    return this.authService.signUp(body);
  }
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() body: SigninDTO): Promise<object | undefined> {
    return this.authService.signin(body);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Put('')
  UpdateUser(
    @Body() body: UpdateDTO,
    @Request() request: Request & { user: User & { _id: string } },
  ): Promise<object | undefined> {
    return this.authService.updateUser(body, request);
  }
}
