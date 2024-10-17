import { Router, Request, Response } from 'express';
import { getPost, createPost, getPosts, updatePost, deletePost } from '../controllers/postController';

const router = Router();

router.get('/', getPosts);

router.get('/:id', async (req: Request, res: Response) => {
    await getPost(req, res);
  });
  
router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;
