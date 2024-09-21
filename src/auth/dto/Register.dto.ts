import { IsEmail, IsString, NotEquals } from "class-validator";


export class RegisterDto {

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  fullName: string;

  @IsEmail()
  email: string;
}

export class LoginDto {
  @IsString()
  email: string

  @IsString()
  password: string;
}