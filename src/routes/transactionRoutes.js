import express from 'express';

import verifytoken from "../middlewares/verifytoken.js";
import {
  getTransaction,
  getTransactionsByAccountId,
  postTransaction,
  updateTransaction,
  deleteTransaction
} from '../controllers/transaction.js';

import { validateBody } from "../middlewares/validate.js";
import { transactionSchema, updateTransactionSchema } from "../validators/transaction.js";

const router = express.Router();

router.use(verifytoken);

// Toutes les routes liées aux transactions
router.get('/', getTransaction);             // GET /api/transaction
router.get('/account/:accountId', getTransactionsByAccountId);      // GET /api/transaction/account/:account_id
router.post('/', validateBody(transactionSchema), postTransaction);           // POST /api/transaction
router.put('/:id', validateBody(updateTransactionSchema), updateTransaction);       // PUT /api/transaction/:id
router.delete('/:id', deleteTransaction);    // DELETE /api/transaction/:id

export default router;
