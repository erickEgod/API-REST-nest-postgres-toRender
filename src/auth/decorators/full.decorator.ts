import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../../common/enums/role.enum";
import { ROLES } from "./role.decorator";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";

export function FullDecorator(role: Role) {
  return applyDecorators(ROLES(role), UseGuards(AuthGuard, RolesGuard));
}
