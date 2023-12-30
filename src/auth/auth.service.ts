import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  SigninDTO,
  SignupDTO,
  UpdateDTO,
} from './authValidation/auth.validation';
import { hashSync, compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/schemas/user.schema';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(body: SignupDTO): Promise<object | undefined> {
    const { rePassword, password, email } = body;
    if (rePassword !== password) {
      throw new BadRequestException('password and confirm password not match');
    }
    const existEmail = await this.userService.findByEmail(email);
    if (existEmail) {
      throw new BadRequestException('Email Already Exist, Plz Log-In');
    }
    const saltOrRounds = 10;
    const hash = await hashSync(password, saltOrRounds);
    body.password = hash;
    const user = await this.userService.createUser(body);
    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }

  async signin(body: SigninDTO): Promise<object | undefined> {
    const existUser = await this.userService.findByEmail(
      body.email,
      'password',
    );
    if (!existUser) {
      throw new NotFoundException('email not found');
    }

    const result = await compareSync(body.password, existUser.password);
    if (result) {
      const payload = { email: existUser.email, id: existUser._id };
      const token = await this.jwtService.signAsync(payload);
      return { token };
    } else {
      throw new BadRequestException('Incorrect Password');
    }
  }

  async updateUser(
    body: UpdateDTO & { _id?: string; email?: string },
    request: Request & { user: User & { _id: string } },
  ): Promise<object | undefined> {
    delete body['password'];
    if (body._id || body.email) {
      throw new BadRequestException('You can not update your email or id');
    }
    return this.userService.updateUser(request.user, body);
  }
}
