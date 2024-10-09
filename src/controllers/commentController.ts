import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createComment = async (req: Request, res: Response) => {
  const { post_id, content, commenter_name } = req.body;
  const comment = await prisma.comment.create({
    data: {
      post_id,
      content,
      commenter_name,
    },
  });
  res.status(201).json(comment);
};

export const getComments = async (req: Request, res: Response) => {
  const comments = await prisma.comment.findMany();
  res.json(comments);
};

export const getComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const comment = await prisma.comment.findUnique({
    where: { id: Number(id) },
  });
  if (!comment) return res.status(404).send('Comment not found');
  res.json(comment);
};

export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content, commenter_name } = req.body;
  const comment = await prisma.comment.update({
    where: { id: Number(id) },
    data: { content, commenter_name },
  });
  res.json(comment);
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.comment.delete({
    where: { id: Number(id) },
  });
  res.status(204).send();
};
