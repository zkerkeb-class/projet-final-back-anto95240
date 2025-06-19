import express from 'express';

import verifytoken from "../middlewares/verifytoken.js";
import { 
    getAccount, 
    getMyAccounts, 
    updateAccount
} from "../controllers/account.js";

import { validateBody } from "../middlewares/validate.js";
import { updateAccountSchema } from "../validators/account.js";

const router = express.Router();

router.use(verifytoken);

// Toutes les routes liées aux comptes
router.get('/', getAccount);                 // GET /api/account
router.get('/:me', getMyAccounts);          // GET /api/account/:id
router.put('/:id', validateBody(updateAccountSchema), updateAccount);           // PUT /api/account/:id

export default router;
