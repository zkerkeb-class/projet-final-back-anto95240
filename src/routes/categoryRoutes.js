import express from 'express';
import verifytoken from "../middlewares/verifytoken.js";
import {
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
  getCategoriesForUser
} from "../controllers/category.js";

import { validateBody } from "../middlewares/validate.js";
import { categorySchema } from "../validators/category.js";

const router = express.Router();

router.use(verifytoken);

router.get('/visible', getCategoriesForUser); // ← retourne les globales + perso pour un user
router.get('/', getCategory);                 // ← toutes les catégories (admin ?)
router.post('/', validateBody(categorySchema), postCategory);
router.put('/:id', validateBody(categorySchema), updateCategory);
router.delete('/:id', deleteCategory);       

export default router;
