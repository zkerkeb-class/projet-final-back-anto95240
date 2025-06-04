import express from 'express';

import verifytoken from "../middlewares/verifytoken.js";
import { 
    getAccount, 
    getAccountById, 
    postAccount, 
    updateAccount, 
    deleteAccount 
} from "../controllers/account.js";

import { validateBody } from "../middlewares/validate.js";
import { accountSchema, updateAccountSchema } from "../validators/account.js";


const router = express.Router();

router.use(verifytoken);

// Toutes les routes liées aux comptes
router.get('/', getAccount);                 // GET /api/account
router.get('/:id', getAccountById);          // GET /api/account/:id
router.post('/', validateBody(accountSchema), postAccount);               // POST /api/account
router.put('/:id', validateBody(updateAccountSchema), updateAccount);           // PUT /api/account/:id
router.delete('/:id', deleteAccount);        // DELETE /api/account/:id

export default router;
