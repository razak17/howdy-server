import { ChatModel } from './chat.model';

export const createChat = async ({
	userId,
	receiverId
}: {
	userId: string;
	receiverId: string;
}) => {
	const members = [userId, receiverId];
	const newMessage = new ChatModel({ creatorId: userId, members });
	return await newMessage.save();
};

export const getUserChats = async (userId: string) =>
	await ChatModel.find({
		members: { $in: [userId] }
	});

export const findChat = async ({
	firstParticipantId,
	secondParticipantId
}: {
	firstParticipantId: string;
	secondParticipantId: string;
}) =>
	await ChatModel.findOne({
		members: { $all: [firstParticipantId, secondParticipantId] }
	});
