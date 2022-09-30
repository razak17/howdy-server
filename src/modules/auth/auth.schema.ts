import { TypeOf, z } from 'zod';

export const registerSchema = {
	body: z
		.object({
			firstName: z
				.string({
					required_error: 'firstName is required'
				})
				.min(2, 'lastName must be at least 2 characters long'),
			lastName: z
				.string({
					required_error: 'lastName is required'
				})
				.min(2, 'lastName must be at least 2 characters long'),
			username: z
				.string({
					required_error: 'username is required'
				})
				.min(2, 'username must be at least 2 characters long'),
			email: z
				.string({
					required_error: 'email is required'
				})
				.email('Not a valid email'),
			password: z
				.string({
					required_error: 'password is required'
				})
				.min(6, 'password must be at least 6 characters long')
				.max(42, 'password should not be longer than 64 characters'),
			confirmPassword: z
				.string({
					required_error: 'password is required'
				})
				.min(6, 'password must be at least 6 characters long')
				.max(42, 'password should not be longer than 64 characters')
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: 'passwords do not match',
			path: ['confirmPassword']
		})
};

export type RegisterUserBody = TypeOf<typeof registerSchema.body>;
