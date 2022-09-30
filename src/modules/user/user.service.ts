import { UserModel } from './user.model';

export async function getUserById(userId: string) {
  return await UserModel.findById(userId);
}

export async function updateUser(userId: string, update: object) {
	return await UserModel.findByIdAndUpdate(userId, { $set: update }, { new: true });
}
