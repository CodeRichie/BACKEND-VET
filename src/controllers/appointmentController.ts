import { Request,Response } from "express";
import { User } from "../models/User";
import { Appointment } from "../models/Appointment";
import { Doctor } from "../models/Doctor";
import { Client } from "../models/Client";
import { Role } from "../models/Role";
import bcrypt from 'bcrypt';
import { UserRoles } from "../constants/UserRoles";
import { Console } from "console";

export const appointmentController = {

    //Get all Appointments
    async getAll(req:Request,res:Response){
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const [appointments,totalAppointments] = await Appointment.findAndCount(
                {
                    select:{
                        id:true,
                        day_date:true,
                        description:true,
                        price:true,
                    },
                }
            );
            console.log('appointments', appointments)
            console.log('totalAppointments', totalAppointments)
            res.json(appointments).status(200);

        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    //Get Appointment by ID
    async getById(req:Request,res:Response){
        try {
            const id = Number(req.params.id);
            const appointment = await Appointment.findOne({
                relations:{
                    doctor:{
                        user:true
                    },
                    client:{
                        user:true
                    
                    },
                },
                select:{
                    id:true,
                    day_date:true,
                    description:true,
                    price:true,
                    doctor:{
                            id:true,
                            user:{
                                firstName:true,
                                email:true,
                                phone:true,
                            }                                  
                    },
                    client:{
                        id:true, 
                        user:{
                            firstName:true,
                            email:true,
                            phone:true,
                        }               
                    }
                    },
                    where:{
                        id:id
                    }
                    
                });
            if(!appointment){
                res.status(404).json({message:"Appointment not found"});
                return;
            }

            console.log(appointment);

            res.json(appointment);
        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },


    //Create Appointment
    async create(req:Request,res:Response){
        try {
console.log(req.tokenData.userId)
            const {day_date,description,price,doctor,client} = req.body;
            console.log(day_date)

            const appointment = Appointment.create({
                day_date:day_date,
                description: description,
                price:price,
                doctorID:req.tokenData.userId,
                clientID:client
            });

            await appointment.save();
            res.json(appointment);
        }catch(error){
            console.log(error)
            res.status(500).json({message:"Something went wrong"});
            
        }
    },

    //Update Appointment
    async update(req:Request,res:Response){
        try {
            const id = Number(req.params.id);
            const {day_date,description,price,doctor,client} = req.body;
            const appointment = await Appointment.findOne({where:{id:id}});
                
            if(!appointment){
                res.status(404).json({message:"Appointment not found"});
                return;
            }
            appointment.day_date = day_date;
            appointment.description = description;
            appointment.price = price;
            appointment.doctorID = doctor;
            appointment.clientID = client;
            await appointment.save();
            res.json(appointment);
        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    //Delete Appointment
    async delete(req:Request,res:Response){
        try {
            const id = Number(req.params.id);
            const appointment = await Appointment.findOne({where:{id:id}});
            if(!appointment){
                res.status(404).json({message:"Appointment not found"});
                return;
            }
            await appointment.remove();
            res.json({message:"Appointment deleted"});
        }catch(error){
            res.status(500).json({message:"Something went wrong"});
        }
    },

    //Get all Appointments by Client
    
    async getByLogedClient(req:Request,res:Response){
        try {        
            const logedClient = await Client.findOne({
                select:{
                    id:true
                },
                where:{
                    userID: req.tokenData?.userId
            }});
        
            const appointments = await Appointment.find({
                relations:{
                    doctor:true,
                    client:true,
                },
                select:{
                    id:true,
                    day_date:true,
                    description:true,
                    price:true,
                    doctor:{
                            id:true,
                            user:{
                                firstName:true,
                                email:true,
                                phone:true,
                            }                                
                    },
                    client:{
                        id:true,
                        user:{
                            firstName:true,
                            email:true,
                            phone:true,                
                        }
                    
                    
                    }
                },
                where:{
                    clientID:logedClient?.id
                }
            });
        
                
                 res.json(appointments).status(200);
            
    
        } catch (error) {
            return res.status(500).json({message:"Something went wrong"});

        }
    },
    //Get all Appointments by Loged Doctor
    async getByLogedDoctor(req:Request,res:Response){
        const doctor = await Doctor.findOne({
            select:{
                id:true
            },
            where:{
                userID:req.tokenData?.userId
            }});
            console.log('req.tokenData?.userId', req.tokenData?.userId);
            console.log('doctor', doctor);
    
        const appointments = await Appointment.find({
            relations:{
                doctor:true,
                client:true,
            },
            select:{
                id:true,
                day_date:true,
                description:true,
                price:true,
                doctor:{
                        id:true,
                        user:{
                            firstName:true,
                            email:true,
                            phone:true,
                        }                                  
                },
                client:{
                    id:true, 
                    user:{
                        firstName:true,
                        email:true,
                        phone:true,
                    }               
                }
                },
                where:{
                    doctorID:req.tokenData.userId
                }
                
            });
            res.json(appointments).status(200);
    
        }

}