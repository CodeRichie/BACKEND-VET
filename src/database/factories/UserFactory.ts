import { faker } from "@faker-js/faker";
import {User} from "../../models/User"
import { Factory } from "./Factory";
import bcrypt from 'bcrypt';

export class UserFactory extends Factory<User>{
    protected generate():User{
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            phone: 290867512,
            password: bcrypt.hashSync('12345678', 10),
            isActive: true,
        } as User
    }
}