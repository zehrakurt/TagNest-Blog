import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTag = async (req: Request, res: Response) => {
  const { name } = req.body;
  const tag = await prisma.tag.create({
    data: {
      name,
    },
  });
  res.status(201).json(tag);
};

export const getTags = async (req: Request, res: Response) => {
  const tags = await prisma.tag.findMany();
  res.json(tags);
};

export const getTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tag = await prisma.tag.findUnique({
    where: { id: Number(id) },
  });
  if (!tag) return res.status(404).send('Tag not found');
  res.json(tag);
};

export const updateTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const tag = await prisma.tag.update({
    where: { id: Number(id) },
    data: { name },
  });
  res.json(tag);
};

export const deleteTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.tag.delete({
    where: { id: Number(id) },
  });
  res.status(204).send();
};
