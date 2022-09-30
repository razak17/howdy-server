import { object, string, TypeOf } from 'zod';

export const createChatSchema = {
	body: object({
		receiverId: string({ required_error: 'receiverId is required' })
	})
};

export const getUserChatsSchema = {
	params: object({
		userId: string()
	})
};

export const findChatSchema = {
	params: object({
		firstParticipantId: string(),
		secondParticipantId: string()
	})
};

export type CreateChatBody = TypeOf<typeof createChatSchema.body>;
export type GetUserChatsParams = TypeOf<typeof getUserChatsSchema.params>;
export type findChatParams = TypeOf<typeof findChatSchema.params>;
