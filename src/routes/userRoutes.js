import express from 'express';

import verifytoken from "../middlewares/verifytoken.js";
import { 
    login, 
    signUp, 
    getUser, 
    getUserById,
    updateUser, 
    deleteUser
} from "../controllers/user.js";

const router = express.Router();

// Toutes les routes liées aux transactions
router.get('/', verifytoken, getUser);             // GET /api/user
router.get('/:id', verifytoken, getUserById);             // GET /api/user
router.post('/login', login);         // POST /api/user/login
router.post('/sign-up', signUp);      // POST /api/user/sign-up
router.put('/:id', verifytoken, updateUser);          // PUT /api/user
router.delete('/:id', verifytoken, deleteUser);       // DELETE /api/user

export default router;
