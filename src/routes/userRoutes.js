import express from 'express';

import verifytoken from "../middlewares/verifytoken.js";
import { 
    login, 
    signUp, 
    getUser, 
    updateUser, 
    deleteUser, 
    signOut 
} from "../controllers/user/index.js";

const router = express.Router();

// Toutes les routes liées aux transactions
router.get('/', verifytoken, getUser);             // GET /api/user
router.post('/login', login);         // POST /api/user/login
router.post('/sign-up', signUp);      // POST /api/user/sign-in
router.post('/sign-out', verifytoken, signOut);    // POST /api/user/sign-out
router.put('/', verifytoken, updateUser);          // PUT /api/user
router.delete('/', verifytoken, deleteUser);       // DELETE /api/user

export default router;
