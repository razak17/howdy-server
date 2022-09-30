import express, { Request, Response } from 'express';
import requireUser from '../../middleware/requireUser';

export const helloController = (req: Request, res: Response) => {
	res.send({ status: 'ok' });
};

const router = express.Router();

router.post('/', requireUser, helloController);
router.get('/:id', helloController);
router.put('/:id', requireUser, helloController);
router.delete('/:id', requireUser, helloController);
router.put('/:id/like', requireUser, helloController);
router.get('/:id/timeline', helloController);

export default router;
