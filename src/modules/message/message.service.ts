import { Message, MessageModel } from './message.model';

export const createMessage = async (description: Message['description'], senderId: string) => {
	const newMessage = new MessageModel({ description, senderId });
	return newMessage;
};
