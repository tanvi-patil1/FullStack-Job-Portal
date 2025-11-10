import express from 'express';
import { loginUser, registerUser, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.put('/profile', protect, updateProfile);

export default router;
