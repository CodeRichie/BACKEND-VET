import { Doctor } from "../../models/Doctor";
import {faker} from "@faker-js/faker";
import { Factory } from "./Factory";

export class DoctorFactory extends Factory<Doctor>{
    protected generate():Doctor{
        return{
            style: faker.helpers.arrayElement([
                "Neotraditional",
                "Traditional",
                "Trashpolka",
                "Japanese",
                "Blackworks",
                "Minimalist",
                "Realism"
            ]),
            area: faker.location.city()
            
        } as Doctor;
    }
}