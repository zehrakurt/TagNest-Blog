import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addTagToPost = async (req: Request, res: Response) => {
  const { post_id, tag_id } = req.body;

  try {
    const postTag = await prisma.postTag.create({
      data: {
        post_id: Number(post_id),
        tag_id: Number(tag_id),
      },
    });

    res.status(201).json(postTag);
  } catch(error){
    res.status(400).json({message:'error'})
}
};
export const removeTagFromPost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: post_id, tag_id } = req.params;

    await prisma.postTag.deleteMany({
      where: {
        post_id: Number(post_id),
        tag_id: Number(tag_id),
      },
    });

    return res.status(204).send();  
  } catch(error){
    res.status(400).json({message:'error'})
}
};


