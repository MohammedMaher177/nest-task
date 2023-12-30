import { Body, Controller, Put, Request } from '@nestjs/common';
import { Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SigninDTO,
  SignupDTO,
  UpdateDTO,
} from './authValidation/auth.validation';
import { User } from 'src/schemas/user.schema';
import { Public } from 'src/common/decorators/public.decorator';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() body: SignupDTO): Promise<object | undefined> {
    return this.authService.signUp(body);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() body: SigninDTO): Promise<object | undefined> {
    return this.authService.signin(body);
  }

  @HttpCode(HttpStatus.OK)
  @Put('')
  UpdateUser(
    @Body() body: UpdateDTO,
    @Request() request: Request & { user: User & { _id: string } },
  ): Promise<object | undefined> {
    return this.authService.updateUser(body, request);
  }
}
