import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BreedsService } from "./breeds.service";
import { CreateBreedDto } from "./dto/create-breed.dto";
import { UpdateBreedDto } from "./dto/update-breed.dto";
import { FullDecorator } from "src/auth/decorators/full.decorator";
import { Role } from "src/common/enums/role.enum";

@FullDecorator(Role.Admin)
@Controller("breeds")
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Post()
  create(@Body() createBreed: CreateBreedDto) {
    return this.breedsService.create(createBreed);
  }

  @Get()
  findAll() {
    return this.breedsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.breedsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedsService.update(+id, updateBreedDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.breedsService.remove(+id);
  }
}
