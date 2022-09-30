import { TypeOf, object, string } from 'zod';

const postSchema = {
	body: object({
		userId: string(),
		description: string({ required_error: 'description is required' }),
		image: string().optional()
	})
};

export type PostBody = TypeOf<typeof postSchema.body>;
