import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  
  const isAuthenticated = true; 

  if (!isAuthenticated) {
    res.status(401).json({ error: 'Unauthorized' });
    return; 
  }

  next(); 
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
 
  const isAdmin = true; 

  if (!isAdmin) {
    res.status(403).json({ error: 'Forbidden' });
    return; 
  }

  next(); 
};
