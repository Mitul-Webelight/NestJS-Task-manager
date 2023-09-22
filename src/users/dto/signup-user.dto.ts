import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
