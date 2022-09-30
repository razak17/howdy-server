import express, { Request, Response } from 'express';
import { processRequestBody } from 'zod-express-middleware';

import requireUser from '../../middleware/requireUser';
import { createMessageHandler } from './message.controller';
import { createMessageSchema } from './message.schema';

const router = express.Router();

export const helloController = (req: Request, res: Response) => {
	res.send({ status: 'ok' });
};

// Create new message
router.post('/', requireUser, processRequestBody(createMessageSchema.body), createMessageHandler);

// Get message
router.get('/:messageId', requireUser, helloController);

export default router;
