import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getSettings } from '../controllers/settingsController.js';

const router = express.Router();
router.get('/', protect, getSettings);
export default router;
