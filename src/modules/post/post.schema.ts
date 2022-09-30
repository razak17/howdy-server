import { TypeOf, object, string } from 'zod';

const payload = {
	body: object({
		description: string({ required_error: 'description is required' }),
		image: string().optional()
	})
};

const params = {
	params: object({
		postId: string()
	})
};

export const createPostSchema = {
	...payload
};

export const updatePostSchema = {
	...payload,
	...params
};

export type CreatePostBody = TypeOf<typeof createPostSchema.body>;
export type UpdatePostBody = TypeOf<typeof updatePostSchema.body>;
export type UpdatePostParams = TypeOf<typeof updatePostSchema.params>;
export type GetPostParams = TypeOf<typeof updatePostSchema.params>;
