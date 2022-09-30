import { ChatModel } from './chat.model';

export const createChat = async (userId: string, receiverId: string) => {
	const members = [userId, receiverId];
	const newMessage = new ChatModel({ creatorId: userId, members });
	return await newMessage.save();
};
