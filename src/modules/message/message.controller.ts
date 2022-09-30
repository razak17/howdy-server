import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateMessageBody, getMessagesParams } from './message.schema';
import { createMessage, findMessagesByChatId } from './message.service';

export const createMessageHandler = async (
	req: Request<Record<string, unknown>, Record<string, unknown>, CreateMessageBody>,
	res: Response
) => {
	const { _id: userId } = res.locals.user;
	const { description } = req.body;

	try {
		const newMessage = await createMessage(description, userId);
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
		const result = await findMessagesByChatId(chatId);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
};
