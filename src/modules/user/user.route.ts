import { Request, Response } from 'express';
import express from 'express';

const router = express.Router();

const helloController = (req: Request, res: Response) => {
	res.send({ status: 'ok' });
};

// Get User by ID
router.get('/:id', helloController);

// Get All Users
router.get('/', helloController);

// Update Users
router.put('/:id', helloController);

// Delete Users
router.put('/:id', helloController);

// Follow
router.put('/:id/follow', helloController);

// Unfollow
router.put('/:id/unfollow', helloController);

export default router;
