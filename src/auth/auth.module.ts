import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { getJwtConfig } from "../configs/jwt.config";
import { PassportModule } from "@nestjs/passport";
import { UserModel } from "../models/User.model";
import { TypegooseModule } from "@m8a/nestjs-typegoose";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: UserModel,
      schemaOptions: {
        collection: "Users"
      }
    }
    ]),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
  ],
  exports: [AuthService]
})
export class AuthModule {}
