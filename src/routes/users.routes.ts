import express from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeMiddleware } from '../middlewares/authorize';
const router = express.Router();


//Perfil Rutas

//Create user
router.post('/create', userController.create);

//get loged user profile
router.get('/profile/',authMiddleware, userController.getLogedUser);

//Update loged user profile
router.put('/profile/update',authMiddleware, userController.updateLogedUser);


//get user by id
router.get('/:id', authMiddleware, userController.getProfileById);


//Rutas de admin

//edit user role
router.put('/edit/role/:id',authMiddleware,authorizeMiddleware(["admin"]), userController.editUserRole);

//get all users
router.get('/', authMiddleware, userController.getAll);


//edit user
router.put('/edit/:id',authMiddleware,authorizeMiddleware(["admin"]), userController.update);

//delete user
router.delete('/delete/:id',authMiddleware, authorizeMiddleware(["Admin"]),userController.delete);


export default router;