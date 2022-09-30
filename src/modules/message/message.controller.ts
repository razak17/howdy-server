import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateMessageBody, getMessagesParams } from './message.schema';
import { createMessage, findMessages } from './message.service';

export const createMessageHandler = async (
	req: Request<Record<string, unknown>, Record<string, unknown>, CreateMessageBody>,
	res: Response
) => {
	const { _id: userId } = res.locals.user;
	const { chatId, description, receiverId } = req.body;

	try {
		const newMessage = await createMessage({ chatId, description, senderId: userId, receiverId });
		return res.status(StatusCodes.OK).json(newMessage);
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
	}
};

export const getMessagesHandler = async (
	req: Request<getMessagesParams, Record<string, unknown>, Record<string, unknown>>,
	res: Response
) => {
	const { chatId } = req.params;
	try {
		const messages = await findMessages(chatId);
		return res.status(StatusCodes.OK).json(messages);
	} catch (error) {
		res.status(500).json(error);
	}
};
