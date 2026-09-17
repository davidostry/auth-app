import {Router} from 'express';
import { getDetails, login, register } from '../CTRLS/users.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.post("/register", register)

router.post("/login", login)

router.get("/profile", auth, getDetails)

export default router;
