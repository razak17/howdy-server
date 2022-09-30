import express from 'express';
import { helloController } from '../user/user.route';

const router = express.Router();

// Register
router.post('/register', helloController);

// Login
router.post('/login', helloController);

export default router;
