import express from 'express';
import verifytoken from "../middlewares/verifytoken.js";
import {
  getCategory,
  getCategoryById,
  postCategory,
  updateCategory,
  deleteCategory,
  getCategoriesForUser,
//   initCategories,
} from "../controllers/category.js";

const router = express.Router();

// router.post('/init', initCategories); // ← route d'initialisation (à placer AVANT verifytoken)
router.use(verifytoken);

router.get('/visible', getCategoriesForUser); // ← retourne les globales + perso pour un user
router.get('/', getCategory);                 // ← toutes les catégories (admin ?)
router.get('/:id', getCategoryById);
router.post('/', postCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
