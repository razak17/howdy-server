import express from 'express';
import { helloController } from '../user/user.route';
import { registerHandler } from './auth.controller';

const router = express.Router();

// Register
router.post('/register', registerHandler);

// Login
router.post('/login', helloController);

export default router;
