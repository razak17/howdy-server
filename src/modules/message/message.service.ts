import { MessageModel } from './message.model';

export const createMessage = async ({
	chatId,
	description,
	senderId,
	receiverId
}: {
	chatId: string;
	description: string;
	senderId: string;
	receiverId: string;
}) => {
	const newMessage = new MessageModel({ chatId, description, senderId, receiverId });
	return await newMessage.save();
};

export const findMessages = async (chatId: string) => await MessageModel.find({ chatId });
