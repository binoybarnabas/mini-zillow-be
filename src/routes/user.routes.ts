import { Router } from 'express';
import { getAllUsers } from '../controllers/users.controller';

const router = Router();

router.get('/', getAllUsers); // GET /users

export default router;
