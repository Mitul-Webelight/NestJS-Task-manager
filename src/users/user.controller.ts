import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { AuthService } from './auth/auth.service';
import { errorRes, successRes } from 'src/response/response';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Get()
  async getAllUser(@Res() res: Response): Promise<any> {
    try {
      const getAllUser = await this.userService.getAll();
      return successRes(res, HttpStatus.OK, getAllUser);
    } catch (error) {
      return errorRes(res, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Get('/:id')
  async getUser(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const getUser = await this.userService.getById(id);
      return successRes(res, HttpStatus.OK, getUser);
    } catch (error) {
      return errorRes(res, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const updateUser = await this.userService.update(id, updateUserDto);
      return successRes(res, HttpStatus.OK, updateUser);
    } catch (error) {
      return errorRes(res, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const deleteUser = await this.userService.delete(id);
      return successRes(res, HttpStatus.OK, deleteUser);
    } catch (error) {
      return errorRes(res, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('auth/login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const userLogin = await this.authService.login(loginUserDto);
      return successRes(res, HttpStatus.OK, userLogin);
    } catch (error) {
      return errorRes(res, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('auth/signup')
  async signup(
    @Body() signupUserDto: SignupUserDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const userSignup = await this.authService.signup(signupUserDto);
      return successRes(res, HttpStatus.CREATED, userSignup);
    } catch (error) {
      return errorRes(res, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
