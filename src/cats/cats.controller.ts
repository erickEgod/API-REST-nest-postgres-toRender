import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { ActiveUser } from "../common/decorators/user-active.decorator";
import { RequestInterface } from "../common/interfaces/request.interface";
import { FullDecorator } from "../auth/decorators/full.decorator";
import { Role } from "../common/enums/role.enum";

@FullDecorator(Role.User)
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(
    @Body() createCat: CreateCatDto,
    @ActiveUser() user: RequestInterface,
  ) {
    return this.catsService.create(createCat, user);
  }

  //!Obtener todos los gatos de un usuario
  @Get()
  findAll(@ActiveUser() user: RequestInterface) {
    //todo Mando este decorador que creé que recoge el "user" que envíe en el token
    return this.catsService.findAll(user);
  }

  //!Obtener 1 gato
  @Get(":id")
  findOne(@Param("id") id: number, @ActiveUser() user: RequestInterface) {
    return this.catsService.findOne(id, user);
  }

  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() updateCat: UpdateCatDto,
    @ActiveUser() user: RequestInterface,
  ) {
    return this.catsService.update(id, updateCat, user);
  }

  @Delete(":id")
  remove(@Param("id") id: number, @ActiveUser() user: RequestInterface) {
    return this.catsService.remove(id, user);
  }
}
