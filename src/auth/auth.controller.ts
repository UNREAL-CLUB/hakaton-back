import { BadRequestException, Body, Controller, HttpException, Post } from "@nestjs/common";
import { RegisterDto,LoginDto } from "./dto/Register.dto";
import { AuthService } from "./auth.service";
import { EMAIL_ALREADY_REGISTERED } from "./auth.constants";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}


  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const isExists = await this.authService.findUser(dto.email)
    if(isExists) throw new BadRequestException(EMAIL_ALREADY_REGISTERED);

    return this.authService.register(dto)
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const validated = await this.authService.validate(dto);
    const access_token = await this.authService.login(dto);

    return {
      access_token: access_token
    }
  }
}
