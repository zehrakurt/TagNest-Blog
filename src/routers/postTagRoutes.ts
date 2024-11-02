import express, { Request, Response } from 'express';
import { removeTagFromPost, addTagToPost } from '../controllers/postTagController';

const router = express.Router();


router.post('/:post_id/tags', addTagToPost);


router.delete('/:post_id/tags/:tag_id', removeTagFromPost);

export default router;
