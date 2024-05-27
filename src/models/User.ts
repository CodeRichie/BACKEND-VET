import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, ManyToMany, OneToOne, OneToMany } from "typeorm"
import {Role} from "./Role"
import { Doctor } from "./Doctor";
import { Client } from "./Client";


@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({name:"first_name"})
    firstName!: string;

    @Column({name:"last_name"})
    lastName!:string;

    @Column({name:"email"})
    email!:string;

    @Column({name:"phone"})
    phone!:number;

    @Column({name:"password", select:false})
    password!:string;

    @Column({name:"is_active"})
    isActive!:boolean;

    //Relacion {1}--{1} con Roles
    @ManyToOne(()=>Role,(role)=>role.user)
    @JoinColumn({name:"role_id"})
    role!:Role;


}