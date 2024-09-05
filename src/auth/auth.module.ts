import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
//!dotenv para usar la secret_word de .env en este módulo
//import * as dotenv from "dotenv";
import { ConfigModule, ConfigService } from "@nestjs/config";

//dotenv.config();

@Module({
  imports: [
    UsersModule,
    //!Así con envs para producción (se hacen asíncronas para que pueda leer la variable de entorno)
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("SECRET_WORD"),
        signOptions: { expiresIn: "1d" },
        global: true,
      }),
      inject: [ConfigService],
    }),
    //!Así sin env
    // JwtModule.register({
    //   global: true,
    //   secret: process.env.SECRET_WORD,
    //   signOptions: { expiresIn: "1h" },
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
