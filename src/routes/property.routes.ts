import express from 'express';
import { handleCreateProperty, handleGetAllProperties } from '../controllers/property.controller';
import { upload } from '../middlewares/multer.middleware';
import { authenticateToken } from '../middlewares/auth.middleware';


const router = express.Router();

// POST /api/properties
router.post('/', authenticateToken, upload.array('images'), handleCreateProperty);
router.get('/list',authenticateToken, handleGetAllProperties);

export default router;
