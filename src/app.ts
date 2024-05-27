import express, { Application } from "express";
import cors                     from "cors";
import {corsOptions}            from "./config/cors";
import dotenv                   from "dotenv";
import {userController}         from './controllers/userController';
import apiRoutes from "./routes/api.routes";
import baseRoutes from "./routes/base.routes";

//------------------------------------------------------

dotenv.config();

const app: Application = express();

//Middleware
app.use(express.json());
app.use(cors(corsOptions));

//Routes
app.get('/',baseRoutes);  //baseRoutes is not defined
app.use('/api',apiRoutes);  //apiRoutes is not defined

// user controller
app.get('/api/users',userController.getAll)
app.post('/api/users',userController.create)
app.put('/api/users',userController.update)
app.delete('/api/users',userController.delete)

export default app;