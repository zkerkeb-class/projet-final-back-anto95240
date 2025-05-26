import express from 'express';

import verifytoken from "../middlewares/verifytoken.js";
import { 
    getCategory, 
    getCategoryById, 
    postCategory, 
    updateCategory, 
    deleteCategory 
} from "../controllers/category/index.js";

const router = express.Router();

router.use(verifytoken);

// Toutes les routes liées aux transactions
router.get('/', getCategory);             // GET /api/category
router.get('/:id', getCategoryById);      // GET /api/category/:id
router.post('/', postCategory);           // POST /api/category
router.put('/:id', updateCategory);       // PUT /api/category/:id
router.delete('/:id', deleteCategory);    // DELETE /api/category/:id

export default router;
