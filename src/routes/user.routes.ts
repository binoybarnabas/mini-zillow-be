import { Router } from 'express';
import { getAllUsers,getUserById } from '../controllers/users.controller';

const router = Router();

router.get('/', getAllUsers); // GET /users
router.get('/:id',getUserById);

export default router;
