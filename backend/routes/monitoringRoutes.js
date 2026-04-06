import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getMonitoring } from '../controllers/monitoringController.js';

const router = express.Router();
router.get('/', protect, getMonitoring);
export default router;
