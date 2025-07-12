import { Router } from 'express';
import { auth, register } from '../controllers/auth.controller';

const router = Router();

router.post('/login', auth);
router.post('/register',register);

export default router;
