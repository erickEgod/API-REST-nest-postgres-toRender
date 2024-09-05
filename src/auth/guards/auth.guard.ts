import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  //!Función para extraer el token
  private extractTokenFromHeader(request: Request) {
    //Request viene de express
    const [type, token] = request.headers.authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined; //de existir, devuelve el token
  }

  //!Función para verificar el token
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); //obtengo el request

    const token = this.extractTokenFromHeader(request); //obtengo el token desde la función creada arriba
    if (!token) throw new UnauthorizedException("v");

    // try {
    //   const payLoad = await this.jwtService.verifyAsync(token, { //así estaba hecho con dotenv
    //     secret: process.env.SECRET_WORD,
    //   });
    //*Así se hace con configModule de nest para envs
    try {
      const payLoad = await this.jwtService.verifyAsync(token); //ya no se le manda la palabra secreta explícitamente
      request.user = payLoad; //pongo una propiedad user en la request y le mando el payLoad
    } catch {
      throw new UnauthorizedException("b");
    }

    //!Retorno true si pasó todo
    return true;
  }
}
