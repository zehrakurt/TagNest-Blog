import { Request, Response, RequestHandler } from 'express';
import argon2 from 'argon2';
import prisma from '../prismaClient';
import { createToken } from '../utils/jwtUtils';

export const register: RequestHandler = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const hashedPassword = await argon2.hash(password);
    const user = await prisma.user.create({
      data: { name, username, hashed_password: hashedPassword },
    });
    const token = createToken(user.id, user.role);
    res.json({ user, token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await argon2.verify(user.hashed_password, password))) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const token = createToken(user.id, user.role);
    res.json({ user, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: 'Login failed' });
  }
};
