//*Decorador usado en la ruta profile del auth.controler
import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest(); //saco la request
    return req.user;
  },
);
