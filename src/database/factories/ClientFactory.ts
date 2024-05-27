import { Client } from "../../models/Client";
import {faker} from "@faker-js/faker";
import { Factory } from "./Factory";

export class ClientFactory extends Factory<Client>{
    protected generate():Client{
        return{
         area: faker.location.city()
            
        } as Client;
    }
}