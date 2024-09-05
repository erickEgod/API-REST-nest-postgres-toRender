import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Cat } from "./entities/cat.entity";
import { Repository } from "typeorm";
import { Breed } from "src/breeds/entities/breed.entity";
import { Console, error } from "console";
import { RequestInterface } from "src/common/interfaces/request.interface";
import { Role } from "src/common/enums/role.enum";

@Injectable()
export class CatsService {
  //todo: Es la importación de la entity (repository) Cat
  constructor(
    @InjectRepository(Cat) private catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  //!CREAR GATO
  async create(createCat: CreateCatDto, user: RequestInterface) {
    //*Este es normal, el de abajo es cuando ya se tiene relaciones
    //const newCat = this.catRepository.create(createCat);
    // const savedCat = await this.catRepository.save(newCat);
    //return savedCat
    //todo principios solid
    const breed = await this.verifyBreed(createCat.breed);
    return await this.catRepository.save({
      ...createCat,
      breed,
      catUserEmail: user.email,
    });
  }

  //!BUSCAR TODOS LOS GATOS DE UN USUARIO
  async findAll(user: RequestInterface) {
    return await this.catRepository.find({
      where: { catUserEmail: user.email },
    });
  }

  //!Obtener 1 gato pero viendo que sea de ese usuario
  async findOne(id: number, user: RequestInterface) {
    const foundCat = await this.catRepository.findOne({ where: { id } });
    if (!foundCat) throw new BadRequestException("Cat not found");

    //todo principio solid
    this.verifyRoleAndEmail(user, foundCat);

    return foundCat;
  }

  //!ACTUALIZAR GATO
  async update(id: number, updateCat: UpdateCatDto, user: RequestInterface) {
    //todo Principios SOLID
    //*busco el gato con la función de abajo
    //*Verifico el rol y email (ya hace findOne)
    await this.findOne(id, user);
    //*Verifico que el breed exista
    const breed = await this.verifyBreed(updateCat.breed);

    return await this.catRepository.update(id, {
      ...updateCat,
      breed: updateCat.breed ? breed : undefined,
    });
  }

  //!ELIMINAR GATO
  async remove(id: number, user: RequestInterface) {
    //todo Principios SOLID
    await this.findOne(id, user);

    return await this.catRepository.softDelete({ id }); //elimina lógicamente pero se puede recuperar
  }

  //todo-----FUNCIONES PARA REUTILIZARLAS Y SEGUIR EL SOLID
  private verifyRoleAndEmail(user: RequestInterface, foundCat: Cat) {
    if (user.role !== Role.Admin && foundCat.catUserEmail !== user.email)
      throw new UnauthorizedException("Not authorized for this information");
  }

  private async verifyBreed(breed: string) {
    const breedVerified = await this.breedRepository.findOne({
      where: { name: breed },
    });
    if (!breedVerified) throw new BadRequestException("Breed not found");
    return breedVerified;
  }
}
