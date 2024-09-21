import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypegooseModule } from "@m8a/nestjs-typegoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getMongoConfig } from "./configs/mongo.config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [

    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
