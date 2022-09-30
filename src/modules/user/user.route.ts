import express from 'express';
import {
	deleteUserHandler,
	followHandler,
	getAllUsersHandler,
	getUserHandler,
	unfollowHandler,
	updateUserHandler
} from './user.controller';
import requireUser from '../../middleware/requireUser';

const router = express.Router();

// Get current user
router.get('/me', requireUser, (_, res) => {
	return res.send(res.locals.user);
});

// Get User by ID
router.get('/:userId', getUserHandler);

// Get All Users
router.get('/', getAllUsersHandler);

// Update User
router.put('/:userId', requireUser, updateUserHandler);

// Delete User
router.delete('/:userId', requireUser, deleteUserHandler);

// Follow
router.put('/:id/follow', requireUser, followHandler);

// Unfollow
router.put('/:id/unfollow', requireUser, unfollowHandler);

export default router;
