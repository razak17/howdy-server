import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { loginHandler, registerHandler } from './auth.controller';
import { loginSchema, registerSchema } from './auth.schema';

const router = express.Router();

// Register
router.post('/register', processRequestBody(registerSchema.body), registerHandler);

// Login
router.post('/login', processRequestBody(loginSchema.body), loginHandler);

export default router;
