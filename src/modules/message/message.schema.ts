import { TypeOf, object, string } from 'zod';

const createMessageSchema = {
	body: object({
		messageId: string(),
		description: string()
	}),
	params: object({
		videoId: string()
	})
};

export type CreateMessageBody = TypeOf<typeof createMessageSchema.body>;
export type CreateMessageParams = TypeOf<typeof createMessageSchema.params>;
