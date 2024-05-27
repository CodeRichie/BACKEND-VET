import { SeederConfig } from "../../config/seeders";
import { Seeder } from "./seeder";
import { Doctor } from "../../models/Doctor";
import { User } from "../../models/User";
import { getRandomValueFromArray } from "../../helpers/common";
import { DoctorFactory } from "../factories/DoctorFactory";


export class DoctorSeeder extends Seeder{
    protected async generate():Promise <void>{
        const {DOCTORS} = SeederConfig;

        const users = await User.find(
            {
                where:{
                    role:{
                        id:2
                    }
                }
            }
        );
        const doctors = new DoctorFactory().createMany(DOCTORS);
        const newDoctors: User[] = []
        doctors.forEach((doctor: { user: User; }) =>{
            const user = users.pop()
            if(user) 
                return doctor.user = user
            }
        )
        await Doctor.save(doctors);
    }
}