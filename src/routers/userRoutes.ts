import express from 'express';
import { createUser, getUsers, getUser, updateUser, deleteUser } from '../controllers/userController';
import { authMiddleware, adminMiddleware } from '../middleware/Middleware'; 

const router = express.Router();


router.post('/users', authMiddleware, adminMiddleware, createUser);


router.get('/users', authMiddleware, getUsers);


router.get('/users/:id', authMiddleware, getUser);

router.patch('/users/:id', authMiddleware, adminMiddleware, updateUser);


router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

export default router;
