import express from 'express';
import requireUser from '../../middleware/requireUser';
import { processRequestBody } from 'zod-express-middleware';
import { registerSchema } from '../user/user.schema';
import { loginHandler, logoutHandler, registerHandler } from './auth.controller';
import { loginSchema } from './auth.schema';

const router = express.Router();

// Register
router.post('/register', processRequestBody(registerSchema.body), registerHandler);

// Login
router.post('/login', processRequestBody(loginSchema.body), loginHandler);

// Logout
router.post('/logout', requireUser, logoutHandler);

export default router;
