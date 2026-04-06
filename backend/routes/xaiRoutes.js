import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getXAI } from '../controllers/xaiController.js';

const router = express.Router();
router.get('/', protect, getXAI);
export default router;
