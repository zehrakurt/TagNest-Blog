import { Router } from 'express';
import { createTag,updateTag ,getTags,getTag,deleteTag } from '../controllers/tagController';

const router = Router();

router.post('/', createTag);
router.get('/', getTags);         
router.get('/:id', getTag);       
router.put('/:id', updateTag);      
router.delete('/:id', deleteTag);  

export default router;
