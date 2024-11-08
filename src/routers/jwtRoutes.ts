import express from 'express';
import { register, login } from '../controllers/jwtController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
