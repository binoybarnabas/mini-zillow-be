import express from 'express';
import {
  handleGetAllProperties,
  handleDeleteProperty,
} from '../controllers/admin.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/properties', authenticateToken, handleGetAllProperties);
router.delete('/properties/:id', authenticateToken, handleDeleteProperty);

export default router;
