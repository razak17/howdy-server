import { object, string, TypeOf } from 'zod';

export const createChatSchema = {
	body: object({
		receiverId: string({ required_error: 'receiverId is required' })
	})
};

export type CreateChatBody = TypeOf<typeof createChatSchema.body>;
