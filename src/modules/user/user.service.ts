import { User, UserModel } from './user.model';
import argon2 from 'argon2';

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

export async function findUserById(userId: string) {
	return await UserModel.findById(userId);
}

export async function getAllUsers() {
	return await UserModel.find();
}

export async function updateUser({
	userId,
	update
}: {
	userId: string;
	update: Omit<User, 'password' | 'isAdmin' | 'followers' | 'following'>;
}) {
	return await UserModel.findByIdAndUpdate(userId, { $set: update }, { new: true });
}

export async function deleteUser(userId: string) {
	return await UserModel.findByIdAndDelete(userId);
}

export async function follow({ userId, id }: { userId: string; id: string }) {
	await UserModel.findByIdAndUpdate(userId, {
		$addToSet: { following: id }
	});
	await UserModel.findByIdAndUpdate(id, { $addToSet: { followers: userId } });
	return;
}

export async function unfollow({ userId, id }: { userId: string; id: string }) {
	await UserModel.findByIdAndUpdate(userId, {
		$pull: { following: id }
	});
	await UserModel.findByIdAndUpdate(id, { $pull: { followers: userId } });
	return;
}
