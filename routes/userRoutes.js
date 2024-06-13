// routes/userRoutes.js
import express from 'express';
import { register, login, protect, authorize } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Example of protected route
router.get('/admin', protect, authorize('Admin'), (req, res) => {
    res.status(200).json({ message: 'Admin content' });
});

export default router;
