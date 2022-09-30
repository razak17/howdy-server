import express from 'express';
import { helloController } from '../user/user.route';

const router = express.Router();

router.post('/register', helloController);
router.post('/login', helloController);

export default router;
