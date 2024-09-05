import { Role } from "src/common/enums/role.enum";

export class CreateUserDto {
  //no están puestas las condiciones @isistring y de tales
  name?: string;
  email: string;
  password: string;
}
