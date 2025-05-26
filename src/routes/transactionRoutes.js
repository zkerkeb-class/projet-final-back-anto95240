import express from 'express';

import verifytoken from "../middlewares/verifytoken.js";
import {
  getTransaction,
  getTransactionById,
  postTransaction,
  updateTransaction,
  deleteTransaction
} from '../controllers/transaction/index.js';

const router = express.Router();

router.use(verifytoken);

// Toutes les routes liées aux transactions
router.get('/', getTransaction);             // GET /api/transaction
router.get('/:id', getTransactionById);      // GET /api/transaction/:id
router.post('/', postTransaction);           // POST /api/transaction
router.put('/:id', updateTransaction);       // PUT /api/transaction/:id
router.delete('/:id', deleteTransaction);    // DELETE /api/transaction/:id

export default router;
