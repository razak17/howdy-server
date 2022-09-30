import { ChatModel } from './chat.model';

export const createChat = async (userId: string, receiverId: string) => {
	const members = [userId, receiverId];
	const newMessage = new ChatModel({ creatorId: userId, members });
	return await newMessage.save();
};

export const getUserChats = async (userId: string) => {
	return await ChatModel.find({
		members: { $in: [userId] }
	});
};

export const findChat = async (firstParticipantId: string, secondParticipantId: string) => {
	return await ChatModel.findOne({
		members: { $all: [firstParticipantId, secondParticipantId] }
	});
};
