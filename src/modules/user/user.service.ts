import { User, UserModel } from './user.model';

export async function getUserById(userId: string) {
	return await UserModel.findById(userId);
}

export async function getAllUsers() {
	return await UserModel.find();
}

export async function updateUser(
	userId: string,
	update: Omit<User, 'password' | 'isAdmin' | 'followers' | 'following'>
) {
	return await UserModel.findByIdAndUpdate(userId, { $set: update }, { new: true });
}
