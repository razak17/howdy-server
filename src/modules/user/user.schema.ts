import { TypeOf, object, string } from 'zod';

const userSchema = {
	firstName: string({
		required_error: 'firstName is required'
	}).min(2, 'lastName must be at least 2 characters long'),
	lastName: string({
		required_error: 'lastName is required'
	}).min(2, 'lastName must be at least 2 characters long'),
	username: string({
		required_error: 'username is required'
	}).min(2, 'username must be at least 2 characters long'),
	email: string({
		required_error: 'email is required'
	}).email('Not a valid email')
};

const userParams = {
	params: object({
		userId: string()
	})
};

const followParams = {
	params: object({
		id: string()
	})
};

export const registerSchema = {
	body: object({
		...userSchema,
		password: string({
			required_error: 'password is required'
		})
			.min(6, 'password must be at least 6 characters long')
			.max(42, 'password should not be longer than 64 characters'),
		confirmPassword: string({
			required_error: 'password is required'
		})
			.min(6, 'password must be at least 6 characters long')
			.max(42, 'password should not be longer than 64 characters')
	}).refine((data) => data.password === data.confirmPassword, {
		message: 'passwords do not match',
		path: ['confirmPassword']
	})
};

export const getUserSchema = {
	...userParams
};

export const updateUserSchema = {
	body: object({
		...userSchema,
		about: string(),
		profilePicture: string(),
		coverPicture: string(),
		city: string(),
		country: string(),
		workplace: string(),
		relationshipStatus: string()
	}),
	...userParams
};

export const deleteUserSchema = {
	...userParams
};

export const followUserSchema = {
	...followParams
};

export const unfollowUserSchema = {
	...followParams
};

export type RegisterBody = TypeOf<typeof registerSchema.body>;
export type UpdateUserBody = TypeOf<typeof updateUserSchema.body>;
export type UpdateUserParams = TypeOf<typeof updateUserSchema.params>;
export type DeleteUserParams = TypeOf<typeof deleteUserSchema.params>;
export type FollowUserParams = TypeOf<typeof followUserSchema.params>;
export type UnfollowUserParams = TypeOf<typeof unfollowUserSchema.params>;
