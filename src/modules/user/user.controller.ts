import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import omit from '../../utils/omit';
import {
	DeleteUserParams,
	FollowUserParams,
	getUserParams,
	UnfollowUserParams,
	UpdateUserBody,
	UpdateUserParams
} from './user.schema';
import {
	deleteUser,
	follow,
	getAllUsers,
	findUserById,
	unfollow,
	updateUser
} from './user.service';

export async function getUserHandler(
	req: Request<getUserParams, Record<string, unknown>, Record<string, unknown>>,
	res: Response
) {
	const { userId } = req.params;
	try {
		const user = await findUserById(userId);
		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).send('User not found.');
		}
		const rest = omit(user.toJSON(), ['password']);
		return res.status(StatusCodes.OK).json(rest);
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
	}
}

export async function getAllUsersHandler(req: Request, res: Response) {
	try {
		const users = await getAllUsers();
		if (!users) {
			return res.status(StatusCodes.NOT_FOUND).send('Users not found.');
		}
		return res.status(StatusCodes.OK).json(users);
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
	}
}

export const updateUserHandler = async (
	req: Request<UpdateUserParams, Record<string, unknown>, UpdateUserBody>,
	res: Response
) => {
	const { userId } = req.params;

	if (userId !== res.locals.user._id) {
		return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
	}

	try {
		const updatedUser = await updateUser({ userId, update: { ...req.body } });
		return res.status(StatusCodes.OK).json(updatedUser);
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
	}
};

export const deleteUserHandler = async (
	req: Request<DeleteUserParams, Record<string, unknown>, Record<string, unknown>>,
	res: Response
) => {
	const { userId } = req.params;

	if (userId !== res.locals.user._id) {
		return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized.');
	}

	try {
		await deleteUser(userId);
		return res.status(StatusCodes.OK).send('User deleted.');
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
	}
};

export const followHandler = async (
	req: Request<FollowUserParams, Record<string, unknown>, Record<string, unknown>>,
	res: Response
) => {
	const { id } = req.params;
	const userId = res.locals.user._id;

	if (id === userId) {
		return res.status(StatusCodes.FORBIDDEN).send('Cannot follow your own account.');
	}

	try {
		await follow({ userId, id });
		return res.status(StatusCodes.OK).send('Followed successfully.');
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
	}
};

export const unfollowHandler = async (
	req: Request<UnfollowUserParams, Record<string, unknown>, Record<string, unknown>>,
	res: Response
) => {
	const { id } = req.params;
	const userId = res.locals.user._id;
	if (id === userId) {
		return res.status(StatusCodes.FORBIDDEN).send('Cannot unfollow your own account.');
	}

	try {
		await unfollow({ userId, id });
		return res.status(StatusCodes.OK).send('Unfollowed successfully.');
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
	}
};
