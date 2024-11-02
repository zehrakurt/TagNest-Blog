import express from 'express';
import { createUser, getUsers, getUser, updateUser, deleteUser } from '../controllers/userController';
import { authMiddleware, adminMiddleware } from '../middleware/Middleware'; 

const router = express.Router();

// Kullanıcı oluşturma (sadece admin)
router.post('/users', authMiddleware, adminMiddleware, createUser);

// Tüm kullanıcıları alma
router.get('/users', authMiddleware, getUsers);

// Belirli bir kullanıcıyı alma
router.get('/users/:id', authMiddleware, getUser);

// Kullanıcı güncelleme (sadece admin)
router.patch('/users/:id', authMiddleware, adminMiddleware, updateUser);

// Kullanıcı silme (sadece admin)
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

export default router;
