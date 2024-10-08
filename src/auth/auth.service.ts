import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./dto/Register.dto";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { UserModel } from "../models/User.model";
import { PASS_NOT_MATCH, USER_NOT_FOUND } from "./auth.constants";
import { compare, compareSync, genSaltSync, hashSync } from "bcrypt";
import { InjectModel } from "@m8a/nestjs-typegoose";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const salt = genSaltSync(5);
    const password = dto.password
    const passwordHash = hashSync(dto.password, salt);
    const email = dto.email
    const newUser = new this.userModel({
      email: dto.email,
      username: dto.username,
      passwordHash: passwordHash,
      fullName: dto.fullName
    })
    await newUser.save()
    return this.login({email, password})
  }

  async login(dto: LoginDto) {
    const validate = this.validate(dto)
    const email = dto.email;
    const access_token = await this.jwtService.signAsync({email}, {expiresIn: "30d"});
    return access_token
  }

  async validate(dto: LoginDto) {
    const user = await this.findUser(dto.email)
    if(!user) throw new UnauthorizedException(USER_NOT_FOUND)
    const compared = compareSync(dto.password, user.passwordHash)
    if(!compared) throw new UnauthorizedException(PASS_NOT_MATCH)
    return {email: dto.email}
  }

  async findUser(email) {
    return this.userModel.findOne({email: email})
  }

}

