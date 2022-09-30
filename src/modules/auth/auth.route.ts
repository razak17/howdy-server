import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { helloController } from '../user/user.route';
import { registerHandler } from './auth.controller';
import { registerSchema } from './auth.schema';

const router = express.Router();

// Register
router.post('/register', processRequestBody(registerSchema.body), registerHandler);

// Login
router.post('/login', helloController);

export default router;
