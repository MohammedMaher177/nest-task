import {
  Controller,
  Get,
  NotFoundException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.userService.findAll();
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  findAll(@Request() req): string {
    return req.user;
  }
}
