import { Router } from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';

const router = Router();

// CRUD routes for categories
router.post('/', createCategory);          // Create a new category
router.get('/', getAllCategories);         // Get all categories
router.get('/:id', getCategoryById);       // Get a single category by ID
router.patch('/:id', updateCategory);      // Update a category by ID
router.delete('/:id', deleteCategory);     // Delete a category by ID

export default router;
