import { IsEmail, IsString } from "class-validator";


export class RegisterDto {

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;
}

export class LoginDto {
  @IsString()
  email: string

  @IsString()
  password: string;
}