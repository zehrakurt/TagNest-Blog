import express, { Request, Response } from 'express';
import { removeTagFromPost,addTagToPost } from '../controllers/postTagController';

const router = express.Router();
router.post('/:id/tags', addTagToPost);

router.delete('/:id/tags/:tag_id', async (req: Request, res: Response) => {
  await removeTagFromPost(req, res);
});

export default router;
