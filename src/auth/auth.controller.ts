import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthGuard } from "./guards/auth.guard";
import { Request } from "express";
import { ROLES } from "./decorators/role.decorator";
import { RolesGuard } from "./guards/roles.guard";
import { Role } from "../common/enums/role.enum";
import { FullDecorator } from "./decorators/full.decorator";
import { ActiveUser } from "../common/decorators/user-active.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //*Ruta para registrarse: uso el body y lo filtro con un dto para enviarlo al auth.service
  @Post("register")
  userRegister(@Body() registerUser: RegisterUserDto) {
    return this.authService.register(registerUser);
  }

  @Post("login")
  userLogin(@Body() loginUser: LoginUserDto) {
    return this.authService.login(loginUser);
  }

  @Get("profile")
  //   @ROLES(Role.User) //usamos el enum Role para tener las opciones a la mano
  //   @UseGuards(AuthGuard, RolesGuard)
  @FullDecorator(Role.User)
  // userProfile(@Req() req: Request & { user: { email: string; role: string } }) {
  //   //*esta es una forma
  //   return this.authService.userProfile(req.user.email);
  userProfile(@ActiveUser() req) {
    return this.authService.userProfile(req.email);
  }
}
