import express,{Request, Response} from 'express';
import { doctorController } from '../controllers/doctorController';
import { authorizeMiddleware } from '../middlewares/authorize';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/',doctorController.getAll);


router.post('/create',authorizeMiddleware(["Admin"]),doctorController.create);


export default router;