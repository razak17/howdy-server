import { Message, MessageModel } from './message.model';

export const createMessage = async (
	chatId: string,
	description: string,
	senderId: string,
	receiverId: string
) => {
	const newMessage = new MessageModel({ chatId, description, senderId, receiverId });
	return await newMessage.save();
};

export const findMessages = async (chatId: string) => {
	return await MessageModel.find({ chatId });
};
