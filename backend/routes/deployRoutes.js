import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getDeployments } from '../controllers/deployController.js';

const router = express.Router();
router.get('/', protect, getDeployments);
export default router;
