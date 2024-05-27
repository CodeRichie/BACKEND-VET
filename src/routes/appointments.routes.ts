import express from 'express';
import { appointmentController } from '../controllers/appointmentController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeMiddleware } from '../middlewares/authorize';
const router = express.Router();

//Rutas de Appointment

//create appointment
router.post('/create',authMiddleware, appointmentController.create);

//edit appointment
router.put('/:id',authMiddleware, authorizeMiddleware(["doctor"]), appointmentController.update);

//delete appointment
router.delete('/:id',authMiddleware, authorizeMiddleware(["client","doctor"]), appointmentController.delete);

//get appointments by client
router.get('/client/appointments',authMiddleware, appointmentController.getByLogedClient);

//get appointments by doctor
router.get('/doctor/appointment',authMiddleware, appointmentController.getByLogedDoctor);

//Rutas de Admin

//get all appointments
router.get('/',authMiddleware, appointmentController.getAll);

//get appointment by id
router.get('/:id',authMiddleware,authorizeMiddleware(["admin"]), appointmentController.getById);

export default router;