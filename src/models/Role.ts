import { BaseEntity, Entity, PrimaryGeneratedColumn,Column, OneToMany } from "typeorm"
import { User } from "./User";

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name:"name"})
    name!: string;

    // Relation Role {1}--{0..n} Users
    @OneToMany(()=> User,(user)=>user.role)
    user!:User[];

}