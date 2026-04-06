import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getDrift } from '../controllers/driftController.js';

const router = express.Router();
router.get('/', protect, getDrift);
export default router;
