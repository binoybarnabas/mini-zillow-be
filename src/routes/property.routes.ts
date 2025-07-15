import express from 'express';
import { handleCreateProperty, handleGetAllProperties, handleGetPropertyById, handleUpdateProperty } from '../controllers/property.controller';
import { upload } from '../middlewares/multer.middleware';
import { authenticateToken } from '../middlewares/auth.middleware';


const router = express.Router();

// POST /api/properties
router.post('/', authenticateToken, upload.array('images'), handleCreateProperty);
router.get('/list', authenticateToken, handleGetAllProperties);
router.get('/:id', authenticateToken, handleGetPropertyById);
router.put('/:id', authenticateToken,upload.array('images'), handleUpdateProperty);

export default router;
