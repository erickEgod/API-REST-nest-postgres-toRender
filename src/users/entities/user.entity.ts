import { Role } from "../../common/enums/role.enum";
import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity({ name: "users_table" })
export class User {
  @Column({ generated: true, primary: true })
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: "enum", default: Role.User, enum: Role }) //para escoger el rol que tiene (usuario, admin, etc)
  role: Role;

  @DeleteDateColumn()
  deletedAt: Date;
}
