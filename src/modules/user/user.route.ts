import { Request, Response } from 'express';
import express from 'express';
import {
	deleteUserHandler,
	getAllUsersHandler,
	getUserHandler,
	updateUserHandler
} from './user.controller';
import requireUser from '../../middleware/requireUser';

const router = express.Router();

export const helloController = (req: Request, res: Response) => {
	res.send({ status: 'ok' });
};

// Get User by ID
router.get('/:userId', getUserHandler);

// Get All Users
router.get('/', getAllUsersHandler);

// Update User
router.put('/:userId', requireUser, updateUserHandler);

// Delete User
router.delete('/:userId', requireUser, deleteUserHandler);

// Follow
router.put('/:userId/follow', helloController);

// Unfollow
router.put('/:userId/unfollow', helloController);

export default router;
