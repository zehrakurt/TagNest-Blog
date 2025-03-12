import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface User {
  id: string;
  role: string;
}
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'default_secret_key');
    req.user = decoded as User;  // Artık `user` tipini belirtiyoruz.
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user;  // `user` tipinde erişim sağlıyoruz.

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden - Admin access required' });
  }

  next();
};


