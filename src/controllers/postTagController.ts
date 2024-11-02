import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const addTagToPost = async (req: Request, res: Response): Promise<void> => {
  const { post_id, tag_id } = req.body;

  try {
    const postTag = await prisma.postTag.create({
      data: {
        post_id: Number(post_id),
        tag_id: Number(tag_id),
      },
    });

    res.status(201).json(postTag);
  } catch (error) {
    res.status(400).json({ message: 'Error adding tag' });
  }
};


export const removeTagFromPost = async (req: Request, res: Response): Promise<void> => {
  const { post_id, tag_id } = req.params;

  try {
    await prisma.postTag.deleteMany({
      where: {
        post_id: Number(post_id),
        tag_id: Number(tag_id),
      },
    });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error removing tag' });
  }
};
