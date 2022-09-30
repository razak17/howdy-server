import { TypeOf, object, string } from 'zod';

export const createMessageSchema = {
	body: object({
		chatId: string({ required_error: 'chatId is required' }),
		receiverId: string({ required_error: 'receiverId is required' }),
		description: string({ required_error: 'description is required' })
	}),
	params: object({
		chatId: string()
	})
};

export type CreateMessageBody = TypeOf<typeof createMessageSchema.body>;
export type CreateMessageParams = TypeOf<typeof createMessageSchema.params>;
export type getMessagesParams = TypeOf<typeof createMessageSchema.params>;
