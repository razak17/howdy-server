import argon2 from 'argon2';
import { User, UserModel } from '../user/user.model';

export async function createUser(
	user: Pick<User, 'firstName' | 'lastName' | 'username' | 'email' | 'password'>
) {
	const hash = await argon2.hash(user.password);
	const newUser = new UserModel({ ...user, password: hash });
	return await newUser.save();
}

export async function findUserByEmail(email: User['email']) {
	return await UserModel.findOne({ email });
}
