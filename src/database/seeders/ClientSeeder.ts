import { Client } from "../../models/Client";
import { Seeder } from "./seeder";
import { SeederConfig } from "../../config/seeders";
import { User } from "../../models/User";
import { getRandomValueFromArray } from "../../helpers/common";
import { ClientFactory } from "../factories/ClientFactory";

export class ClientSeeder extends Seeder{
    protected async generate():Promise <void>{
        const {CLIENTS} = SeederConfig;

        const users =await User.find(
            {
                where:{
                    role:{
                        id:3
                    }
                }
            }
        );
        const clients = new ClientFactory().createMany(CLIENTS);
        clients.forEach((client: { user: User; })=>{
            client.user=getRandomValueFromArray(users)
        })
        await Client.save(clients);
    } 
}