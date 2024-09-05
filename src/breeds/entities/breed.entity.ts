import { Cat } from "src/cats/entities/cat.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({name:"breeds_table"})
export class Breed {

    @Column({generated:true, primary:true})
    id: number;

    @Column()
    name:string;

    @OneToMany(()=>Cat, (cat)=>cat.breed)
    cats:Cat[];

}

