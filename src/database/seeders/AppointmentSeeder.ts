import { SeederConfig } from "../../config/seeders";
import { AppointmentFactory } from "../factories/AppointmentFactory";
import { Seeder } from "./seeder";
import { Doctor } from "../../models/Doctor";
import { Client } from "../../models/Client";
import { getRandomValueFromArray } from "../../helpers/common";
import { Appointment } from "../../models/Appointment";

export class AppointmentSeeder extends Seeder{
    protected async generate():Promise<void>{
        const {DOCTORS} = SeederConfig;
        const {CLIENTS}= SeederConfig;
        const {APPOINTMENTS} = SeederConfig;

        const doctors= await Doctor.find();
        const clients= await Client.find();

        const appointments = new AppointmentFactory().createMany(APPOINTMENTS);
        appointments.forEach((appointment: { doctor: Doctor; client: Client; }) =>{
            appointment.doctor=getRandomValueFromArray(doctors);
            appointment.client=getRandomValueFromArray(clients);
        })
        await Appointment.save(appointments);
    }
}