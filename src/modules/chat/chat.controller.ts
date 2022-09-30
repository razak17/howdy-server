import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateChatBody, findChatParams, GetUserChatsParams } from './chat.schema';
import { createChat, findChat, getUserChats } from './chat.service';

export const createChatHandler = async (
	req: Request<Record<string, unknown>, Record<string, unknown>, CreateChatBody>,
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

export const getUserChatsHandler = async (
	req: Request<GetUserChatsParams, Record<string, unknown>, Record<string, unknown>>,
	res: Response
) => {
	const { userId } = req.params;
	try {
		const chats = await getUserChats(userId);
		return res.status(StatusCodes.OK).json(chats);
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
	}
};

export const findChatHandler = async (
	req: Request<findChatParams, Record<string, unknown>, Record<string, unknown>>,
	res: Response
) => {
	const { firstParticipantId, secondParticipantId } = req.params;
	try {
		const chats = await findChat(firstParticipantId, secondParticipantId);
		return res.status(StatusCodes.OK).json(chats);
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
	}
};
