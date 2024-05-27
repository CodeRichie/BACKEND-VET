import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { UserRoles } from '../constants/UserRoles';
import { Role } from '../models/Role';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TokenData } from '../types/types';


export const authController = {
    async register(req:Request, res:Response): Promise<void> {
        try {
            //get values from request body
            const { firstName, email, password } = req.body;
            
            //check if values are provided
           if(!firstName || !email || !password){
              res.status(400).json({ 
                 message: "Failed to create user",         
            });
              return;
           }
           
             //hash the password         
           const hashedPassword = bcrypt.hashSync(password, 10);
           
  
           //Create the user with the values provided
           const userToCreate = User.create({
              firstName: firstName,
              email: email,
              password : hashedPassword,
              role: UserRoles.CLIENT,
           });
  
           //save the user in DB
           await User.save(userToCreate);

           res.status(201).json({ message: "User created succesfully" });
  
        } catch (error) {
            //if something goes wrong, return a 500 status
            
           res.status(500).json({
            
              message: "Failed to create user",
            
           });
           
        }
     },
  

    async login(req: Request, res: Response): Promise<void> {
        try{

            // Get email and password from request body
            const { email, password } = req.body;

            // Check if email and password are provided
            if (!email || !password) {
                res.status(400).json({ message: "Email and password are required" });
                return;
            }

            // Find user wich email is equal to the email provided
            const user = await User.findOne({
                relations:{role:true},
                select:{
                    id:true,
                    email:true,
                    password:true,
                    firstName:true
                } ,
                where: {
                    email: email
                }});

            // Check if user exists
            if (!user) {
                res.status(400).json({ message: "Bad Credentials" });
                return;
            }

            // Check if password is valid
            const isValidPassword = bcrypt.compareSync(password, user.password);

            // Check if password is valid
            if (!isValidPassword) {
                res.status(400).json({ message: "Bad Credentials" });
                return;
            }

            // Get user role name
            const userRoleName = user.role.name;
           
            // Payload
            const tokenPayload: TokenData = {
                userId: user.id,
                userRole: userRoleName,
                firstName: user.firstName
            };
            // Generate token
            const token = jwt.sign(tokenPayload,process.env.JWT_SECRET as string,{
                expiresIn: "3h",
            })

            const userInfo= {
                email: user.email, firstName: user.firstName, role: userRoleName
            }

            res.json({ message: "Login succesfully",token, userInfo }).status(200);

        }catch(error){
            res.status(500).json({ message: "Failed to create user" });
               
        }
    },
}