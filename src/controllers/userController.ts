import { Request, Response, NextFunction } from 'express';
import prisma from '../prismaClient';
import argon2 from 'argon2';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, username, password } = req.body;

  try {
    const hashedPassword = await argon2.hash(password);
    const user = await prisma.user.create({
      data: { name, username, hashed_password: hashedPassword },
    });
    res.json(user); // Yanıtı gönderdik, dönüş yok
  } catch (error) {
    next(error); // Hata durumunda next ile hata yönlendirmesi
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { name, username, password } = req.body;

  try {
    const hashedPassword = password ? await argon2.hash(password) : undefined;

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, username, hashed_password: hashedPassword },
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};
