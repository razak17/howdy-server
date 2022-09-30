import express, { Request, Response } from 'express';
import requireUser from '../../middleware/requireUser';
const router = express.Router();

export const helloController = (req: Request, res: Response) => {
	res.send({ status: 'ok' });
};

// Create chat
router.post('/', requireUser, helloController);

// Get user chats
router.get('/:userId', requireUser, helloController);

// Find chat
router.get('/find/:firstId/:secondId', requireUser, helloController);

export default router;
