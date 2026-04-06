import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getCNNModels } from '../controllers/cnnController.js';

const router = express.Router();
router.get('/', protect, getCNNModels);
export default router;
