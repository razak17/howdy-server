import { TypeOf, object, string } from 'zod';

export const createMessageSchema = {
	body: object({
		description: string({ required_error: 'description is required' })
	}),
	params: object({
		chatId: string()
	})
};

export type CreateMessageBody = TypeOf<typeof createMessageSchema.body>;
export type CreateMessageParams = TypeOf<typeof createMessageSchema.params>;
export type getMessagesParams = TypeOf<typeof createMessageSchema.params>;
