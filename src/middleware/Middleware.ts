import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Kullanıcı doğrulama işlemleri
  const isAuthenticated = true; // Gerçek kontrolü buraya ekleyin

  if (!isAuthenticated) {
    res.status(401).json({ error: 'Unauthorized' });
    return; // Middleware'i burada bitir
  }

  next(); // Yetkili kullanıcı ise bir sonraki middleware'e geç
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Admin kontrolü
  const isAdmin = true; // Gerçek kontrolü buraya ekleyin

  if (!isAdmin) {
    res.status(403).json({ error: 'Forbidden' });
    return; // Middleware'i burada bitir
  }

  next(); // Eğer kullanıcı admin ise, bir sonraki middleware'e geç
};
