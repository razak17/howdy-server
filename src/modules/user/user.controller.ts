import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import omit from '../../utils/omit';
import { getAllUsers, getUserById } from './user.service';

export async function getUserHandler(req: Request, res: Response) {
	const { userId } = req.params;
	try {
		const user = await getUserById(userId);
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
