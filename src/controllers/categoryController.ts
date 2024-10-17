import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();





export const createCategory = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: "Name alanı zorunludur." });
    return;
  }

  try {
    const category = await prisma.category.create({
      data: { name },
    });

    res.status(201).json(category);
  } catch(error){
    res.status(400).json({message:'error'})
}
};



export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      res.status(404).json({ message: 'Category bulunamadı' });
    } else {
      res.status(200).json(category);
    }
  } catch(error){
    res.status(400).json({message:'error'})
}
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await prisma.category.update({
    where: { id: Number(id) },
    data: { name },
  });
  res.json(category);
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await prisma.category.delete({
    where: { id: Number(id) },
  });
  res.status(204).send();
};
