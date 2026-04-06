import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getModelRegistry } from '../controllers/registryController.js';

const router = express.Router();
router.get('/', protect, getModelRegistry);
export default router;
