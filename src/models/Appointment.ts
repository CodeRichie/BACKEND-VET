import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
import { Doctor } from "./Doctor";
import { Client } from "./Client";

@Entity('appointments')
export class Appointment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name:"day_date" })
    day_date!: Date;

    @Column({ name: "doctor_id" })
    doctorID!: number;

    @Column({name:"client_id"})
    clientID!: number;

    @Column({name:"description"})
    description!: string;

    @Column({name:"price"})
    price!: number;

    // Relation: Appointment {0..n}--{1} Doctor
    @ManyToOne(()=>Doctor,(doctor)=>doctor.userID)
    @JoinColumn({name:"doctor_id"})
    doctor!:Doctor;

    // Relation: Appointment {0..n}--{1} Client
    @ManyToOne(()=>Client,(client)=>client.id)
    @JoinColumn({name:"client_id"})
    client!:Client;

}