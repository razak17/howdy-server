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

export type CreateChatBody = TypeOf<typeof createChatSchema.body>;
export type GetUserChatsParams = TypeOf<typeof getUserChatsSchema.params>;
