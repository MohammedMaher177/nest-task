/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public jwtService: JwtService,
    private userService: UserService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    // const token = request.headers.authorization;

    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // await this.jwtService.verifyAsync(token, {
      //     secret: jwtConstants.secret,
      //   });
      const payload = this.jwtService.decode(token);

      if (!payload.id) {
        throw new UnauthorizedException();
      }
      const user = await this.userService.findById(payload.id);
      if (!user) {
        throw new UnauthorizedException();
      }
      request['user'] = user;
      // request = { ...request, user };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const token = request.headers['authorization']; //?.split(' ') ?? [];
    return token ? token : undefined;
  }
}
