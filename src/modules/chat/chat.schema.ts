import { object, string, TypeOf } from 'zod';
import { createMessageSchema } from '../message/message.schema';

export const createChatSchema = {
	body: object({
		members: string({ required_error: 'members are required' }).array()
	})
};

export type CreateChatBody = TypeOf<typeof createMessageSchema.body>;
