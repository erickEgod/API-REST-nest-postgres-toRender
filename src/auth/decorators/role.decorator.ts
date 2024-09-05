import { SetMetadata } from "@nestjs/common";
import { Role } from "../../common/enums/role.enum";

export const ROLES_KEY = "roles"; //*para no olvidarnos la palabra secreta
//@Roles("admin") envía "admin" a este decorador
//(admin)=> SetMetadata("roles", admin)
export const ROLES = (role: Role) => SetMetadata(ROLES_KEY, role);
//value               //clave,  value
