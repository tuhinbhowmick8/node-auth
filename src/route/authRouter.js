import { Router } from 'express';
import { createUser, verifyUser } from '../controllers/users.controller.js';
const router = Router();

router.post('/register', createUser);
router.post('/login', verifyUser)

export default router;