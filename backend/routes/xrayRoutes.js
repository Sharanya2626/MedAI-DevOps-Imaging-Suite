import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getXrayAnalysis } from '../controllers/xrayController.js';

const router = express.Router();
router.get('/', protect, getXrayAnalysis);
export default router;
