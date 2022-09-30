import express, { Request, Response } from 'express';
import { processRequestBody } from 'zod-express-middleware';

const router = express.Router();

export const helloController = (req: Request, res: Response) => {
	res.send({ status: 'ok' });
};

// Create new message
router.post('/', helloController);

// Get message
router.get('/:chatId', helloController);

export default router;
