import { Router } from 'express';
import { getAllUsers,getUserById } from '../controllers/users.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
const router = Router();

router.get('/',authenticateToken, getAllUsers); // GET /users
router.get('/:id',getUserById);

export default router;
