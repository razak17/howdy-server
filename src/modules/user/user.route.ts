import { Request, Response } from 'express';
import express from 'express';
import { getAllUsersHandler, getUserHandler } from './user.controller';

const router = express.Router();

export const helloController = (req: Request, res: Response) => {
	res.send({ status: 'ok' });
};

// Get User by ID
router.get('/:userId', getUserHandler);

// Get All Users
router.get('/', getAllUsersHandler);

// Update Users
router.put('/:userId', helloController);

// Delete Users
router.put('/:userId', helloController);

// Follow
router.put('/:userId/follow', helloController);

// Unfollow
router.put('/:userId/unfollow', helloController);

export default router;
