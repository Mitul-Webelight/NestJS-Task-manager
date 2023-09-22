import {
  Injectable,
  ExecutionContext,
  CanActivate,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private jwtservice: JwtService) {}
  canActivate(context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest();
    const tokenHeader = request.header('Authorization');

    if (!tokenHeader) {
      throw new HttpException(
        'Authorization is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = tokenHeader.replace('Bearer ', '');

    const decoded = this.jwtservice.verify(token, {
      secret: 'NestJS-Learning',
    });
    return decoded;
  }
}
