import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { RegisterDto,LoginDto } from "./dto/Register.dto";
import { AuthService } from "./auth.service";
import { EMAIL_ALREADY_REGISTERED } from "./auth.constants";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}


  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() dto: RegisterDto) {
    const isExists = await this.authService.findUser(dto.email)
    if(isExists) throw new BadRequestException(EMAIL_ALREADY_REGISTERED);
    return {
      access_token: await this.authService.register(dto)
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() dto: LoginDto) {
    const validated = await this.authService.validate(dto);
    const access_token = await this.authService.login(dto);

    return {
      access_token: access_token
    }
  }
}
