import { Doctor } from "../../models/Doctor";
import {faker} from "@faker-js/faker";
import { Factory } from "./Factory";

export class DoctorFactory extends Factory<Doctor>{
    protected generate():Doctor{
        return{
            style: faker.helpers.arrayElement([
                "Perros",
                "Gatos",
                "Conejos y Cobayas",
                "Aves",
                "Reptiles",
                "Exoticos",
                "Roedores"
            ]),
            area: faker.location.city()
            
        } as Doctor;
    }
}