import express, { Request, Response } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import requireUser from '../../middleware/requireUser';
import { createChatHandler, getUserChatsHandler } from './chat.controller';
import { createChatSchema } from './chat.schema';
const router = express.Router();

export const helloController = (req: Request, res: Response) => {
	res.send({ status: 'ok' });
};

// Create chat
router.post('/', requireUser, processRequestBody(createChatSchema.body), createChatHandler);

// Get user chats
router.get('/:userId', requireUser, getUserChatsHandler);

// Find chat
router.get('/find/:firstId/:secondId', requireUser, helloController);

export default router;
