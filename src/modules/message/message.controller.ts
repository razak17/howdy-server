import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateMessageBody } from './message.schema';
import { createMessage } from './message.service';

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
