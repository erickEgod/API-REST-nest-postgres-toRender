import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/role.decorator";
import { Role } from "../../common/enums/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  //!Para leer un metadato necesitamos un reflector
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!role) return true; //*Si no envíe nada en @Roles("vacío") entonces dejar pasar

    const { user } = context.switchToHttp().getRequest(); //saco user del request (este user le pasé en el auth.guard)

    //!Validación para que admin pueda controlar esto también
    if (user.role === Role.Admin) return true;

    return role === user.role;
  }
}
