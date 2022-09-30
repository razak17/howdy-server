import mongoose from 'mongoose';
import { UserModel } from '../user/user.model';
import { Post, PostModel } from './post.model';

export const createPost = async (
	post: Omit<Post, 'userId' | 'likes' | 'dislikes'>,
	userId: string
) => {
	const newPost = new PostModel({ ...post, userId });
	return await newPost.save();
};

export async function findPostById(PostId: string) {
	return await PostModel.findById(PostId);
}

export const updatePost = async (
	postId: string,
	update: Omit<Post, 'owner' | 'likes' | 'dislikes' | 'userId'>
) => {
	const updatedPost = await PostModel.findByIdAndUpdate(postId, { $set: update }, { new: true });

	return updatedPost;
};

export async function deletePost(postId: string) {
	return PostModel.findByIdAndDelete(postId);
}

export const likePost = async (userId: string, postId: string) => {
	return await PostModel.findByIdAndUpdate(postId, {
		$addToSet: { likes: userId },
		$pull: { dislikes: userId }
	});
};

export async function dislikePost(userId: string, postId: string) {
	return await PostModel.findByIdAndUpdate(postId, {
		$addToSet: { dislikes: userId },
		$pull: { likes: userId }
	});
}

export const getRandomPosts = async (count = 20) => {
	return await PostModel.find().limit(count);
};

// Feed containing user's own posts as well as posts from other users they follow
export const getFeed = async (userId: string) => {
	const user = await UserModel.findById(userId);
	const following = user?.following;

	if (!following || following.length === 0) {
		return await getRandomPosts();
	}
	const userPosts = await PostModel.find({ userId: userId });

	const feed = await Promise.all(
		following.map(async (id) => {
			const video = await PostModel.find({ userId: new mongoose.Types.ObjectId(id) });
			return video;
		})
	);

	return userPosts
		.concat(feed[0])
		.flat()
		.sort((a, b) => (b.updatedAt as any) - (a.updatedAt as any));
};
