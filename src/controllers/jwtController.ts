import { Request, Response } from 'express';
import prisma from '../prismaClient';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const generateToken = (user: any) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '15m' });
};

export const register = async (req: Request, res: Response) => {
  const { name, username, password } = req.body;
  
  try {
    const hashedPassword = await argon2.hash(password);
    const user = await prisma.user.create({
      data: { name, username, hashed_password: hashedPassword },
    });
    const token = generateToken(user);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await argon2.verify(user.hashed_password, password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = generateToken(user);
  res.json({ user, token });
};
