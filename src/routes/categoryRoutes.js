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

router.get('/visible', getCategoriesForUser);              // GET /api/category/visible
router.get('/', getCategory);              // GET /api/category/
router.post('/', validateBody(categorySchema), postCategory);              // POST /api/category/
router.put('/:id', validateBody(categorySchema), updateCategory);              // PUT /api/category/:id
router.delete('/:id', deleteCategory);                     // DELETE /api/category/:id

export default router;
