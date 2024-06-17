import express from 'express';
import { register, login, getAllUsers, deleteUser, updateUserRole, protect, authorize } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Example of protected route
router.get('/admin', protect, authorize('Admin'), (req, res) => {
    res.status(200).json({ message: 'Admin content' });
});

// Protected routes
router.get('/',  getAllUsers);
router.delete('/:id', deleteUser);
router.put('/:id',updateUserRole);

export default router;
