import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateChatBody } from './chat.schema';
import { createChat } from './chat.service';

export const createChatHandler = async (
	req: Request<Record<string, null>, Record<string, null>, CreateChatBody>,
	res: Response
) => {
	const { _id: userId } = res.locals.user;
	const { receiverId } = req.body;
	try {
		const newChat = await createChat(userId, receiverId);
		return res.status(StatusCodes.OK).json(newChat);
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
	}
};
