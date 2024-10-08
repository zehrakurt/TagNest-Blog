import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({
      data: { name },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({message:'error'})
  }
};


