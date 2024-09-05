//!Una entidad se le llama repositorio en TypeOrm y para nosotros es una tabla

import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../users/entities/user.entity";
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "cat_table" })
export class Cat {
  @PrimaryGeneratedColumn() //esta e suna forma y la de abajo otra
  // @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  // @Column({nullable:true}) //!este es normal, pero para hcaer la relación mmanytoOne sería cono abajo
  // breed: string;

  @ManyToOne(() => Breed, (breed) => breed.id, { eager: true }) //*eager es para poder llamar no al id sino al nombre de la breed
  breed: Breed;

  @DeleteDateColumn() //Ponemos este para habilitar el softDelete que elimina lógicamente de la db
  deletedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "catUserEmail", referencedColumnName: "email" }) //Debe estar vacía la tabla cats para poder relaziar esto
  user: User;

  @Column()
  catUserEmail: string;
}
