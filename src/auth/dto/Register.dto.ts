import { IsEmail, IsString } from "class-validator";


export default class RegisterDto {

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