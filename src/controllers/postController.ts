import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPost = async (req: Request, res: Response) => {
  const { category_id, title, content } = req.body;
  const post = await prisma.post.create({
    data: {
      category_id,
      title,
      content,
    },
  });
  res.status(201).json(post);
};

export const getPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  if (!post) return res.status(404).send('Post not found');
  res.json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { category_id, title, content } = req.body;
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: { category_id, title, content },
  });
  res.json(post);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.post.delete({
    where: { id: Number(id) },
  });
  res.status(204).send();
};
