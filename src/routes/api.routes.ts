import express from 'express';

import usersRoutes from './users.routes';
import baseRoutes from './base.routes';
import appointmentsRoutes from './appointments.routes';
import authRoutes from './auth.routes';
import doctorsRoutes from './doctors.routes'

const router = express.Router();

//API Routes

// base routes
router.use('/', baseRoutes);

// users routes
router.use('/users', usersRoutes);

// appointments routes
router.use('/appointments', appointmentsRoutes);

// auth routes
router.use('/auth',authRoutes);

// doctors routes
router.use('/doctors',doctorsRoutes);

export default router;