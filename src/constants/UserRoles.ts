import { Role } from "../models/Role"
export const UserRoles: Record<string, Role> = {
    ADMIN:  {id:1,name:"admin"}  as Role,
    DOCTOR: {id:2,name:"doctor"} as Role,
    CLIENT: {id:3,name:"client"} as Role
}