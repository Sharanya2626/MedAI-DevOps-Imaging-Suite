import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getFeedback } from '../controllers/feedbackController.js';

const router = express.Router();
router.get('/', protect, getFeedback);
export default router;
