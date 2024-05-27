import { RoleSeeder } from "./RoleSeeder";
import { UserSeeder } from "./UserSeeder";
import { DoctorSeeder } from "./DoctorSeeder";
import { ClientSeeder } from "./ClientSeeder";
import { AppointmentSeeder } from "./AppointmentSeeder";

(async () =>{
    console.log('starting seeding')
    await new RoleSeeder().start();
    await new UserSeeder().start();
    await new DoctorSeeder().start();
    await new ClientSeeder().start();
    await new AppointmentSeeder().start();
})()