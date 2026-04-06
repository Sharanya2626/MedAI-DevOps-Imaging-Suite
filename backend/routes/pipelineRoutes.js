import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getCIPipeline } from '../controllers/pipelineController.js';

const router = express.Router();
router.get('/', protect, getCIPipeline);
export default router;
