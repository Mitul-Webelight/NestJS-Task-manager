import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dto/login-user.dto';
import { SignupUserDto } from '../dto/signup-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userService.findOne(loginUserDto.username);
    if (!user) {
      throw new UnauthorizedException(HttpStatus.UNAUTHORIZED);
    }

    const passwordMatch = await this.bcryptService.comparePassword(
      loginUserDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException(HttpStatus.UNAUTHORIZED);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      await this.validateUser(loginUserDto);
      const payload = { username: loginUserDto.username };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: 'NestJS-Learning',
        }),
        message: 'Authentication successful',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async signup(signupUserDto: SignupUserDto) {
    const { firstName, lastName, username, password, email } = signupUserDto;
    const createdUser = this.userModel.create({
      firstName,
      lastName,
      username,
      password: await this.bcryptService.hashingPassword(password),
      email,
    });
    return createdUser;
  }
}
