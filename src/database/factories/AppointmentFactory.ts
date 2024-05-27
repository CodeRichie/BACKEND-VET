import { faker } from "@faker-js/faker";
import { Appointment } from "../../models/Appointment";
import { Factory } from "./Factory";

export class AppointmentFactory extends Factory<Appointment>{
    protected generate():Appointment{
        return{
            day_date: faker.date.future(),
            description: faker.lorem.sentence(),
            price: faker.number.int({min:1000,max:10000})
        } as Appointment
    }
}