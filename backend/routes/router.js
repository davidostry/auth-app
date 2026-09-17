import {Router} from 'express';
import { register } from '../CTRLS/users.js';

const router = Router();

router.post("/register", register)

export default router;
