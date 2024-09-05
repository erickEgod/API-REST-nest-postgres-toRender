import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  //*Importo el user.service para manejar la db (NO olvidar importar y exportar en los modulos)
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  //!Registro
  async register({ name, email, password }: RegisterUserDto) {
    //!Lo hago así para evitar escribir muchas líneas de código en el hasheo
    const foundUser = await this.userService.findUserByEmail(email);

    if (foundUser) throw new BadRequestException("User already exists");

    this.userService.createUser({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    return { name, email };
  }

  //!Ingresar
  async login({ email, password }: LoginUserDto) {
    //*Verifico si existe el email
    const foundUser = await this.userService.findUserByEmail(email);
    if (!foundUser) throw new UnauthorizedException("Incorrect Credentials");
    //*Verifico si la contraseña coincide
    const comparePassword = await bcrypt.compare(password, foundUser.password);
    if (!comparePassword)
      throw new UnauthorizedException("Incorrect Credentials");

    //*Si todo sale bien
    //*TOKENs
    const payLoad = { email: email, role: foundUser.role }; //Esto es lo que va a ir "codificado" en base 64 dentor del token (información que quiero enviarle al frontend)
    //console.log(process.env.SECRET_WORD);
    return await this.jwtService.signAsync(payLoad);
  }

  //!Para probar la autorización con el @Roles() y el RolesGuard
  userProfile(email: string) {
    return this.userService.findUserByEmail(email);
  }
}
