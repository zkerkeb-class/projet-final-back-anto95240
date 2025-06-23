import express from 'express';
import { updateUser } from '../controllers/user.js';
import { upload } from '../middlewares/upload.js';

import verifytoken from "../middlewares/verifytoken.js";
import { 
    login, 
    signUp, 
    getUser, 
    getMe,
    deleteUser
} from "../controllers/user.js";

import { validateBody } from "../middlewares/validate.js";
import { loginSchema, userSignUpSchema, updateUserSchema } from "../validators/user.js";

const router = express.Router();

// Toutes les routes liées aux transactions
router.get('/', verifytoken, getUser);             // GET /api/user
router.get('/me', verifytoken, getMe);               // GET /api/user/me   
router.post('/login', validateBody(loginSchema), login);         // POST /api/user/login
router.post('/sign-up', validateBody(userSignUpSchema), signUp);      // POST /api/user/sign-up
router.put('/:id', verifytoken, upload.single('image'), validateBody(updateUserSchema), updateUser);          // PUT /api/user
router.delete('/:id', verifytoken, deleteUser);       // DELETE /api/user

export default router;
