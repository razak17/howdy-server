import mongoose from 'mongoose';
import { UserModel } from '../user/user.model';
import { Post, PostModel } from './post.model';

export const createPost = async ({
	post,
	userId
}: {
	post: Omit<Post, 'userId' | 'likes' | 'dislikes'>;
	userId: string;
}) => {
	const newPost = new PostModel({ ...post, userId });
	return await newPost.save();
};

export const findPostById = async (PostId: string) => await PostModel.findById(PostId);

export const updatePost = async ({
	postId,
	update
}: {
	postId: string;
	update: Omit<Post, 'owner' | 'likes' | 'dislikes' | 'userId'>;
}) => {
	const updatedPost = await PostModel.findByIdAndUpdate(postId, { $set: update }, { new: true });
	return updatedPost;
};

export const deletePost = async (postId: string) => PostModel.findByIdAndDelete(postId);

export const likePost = async ({ userId, postId }: { userId: string; postId: string }) => {
	const post = await findPostById(postId);
	if (post?.likes.includes(userId)) {
		return await PostModel.findByIdAndUpdate(postId, {
			$pull: { likes: userId }
		});
	}
	return await PostModel.findByIdAndUpdate(postId, {
		$addToSet: { likes: userId }
	});
};

export const likePostOld = async ({ userId, postId }: { userId: string; postId: string }) => {
	return await PostModel.findByIdAndUpdate(postId, {
		$addToSet: { likes: userId },
		$pull: { dislikes: userId }
	});
};

export const dislikePost = async ({ userId, postId }: { userId: string; postId: string }) => {
	return await PostModel.findByIdAndUpdate(postId, {
		$addToSet: { dislikes: userId },
		$pull: { likes: userId }
	});
};

export const getRandomPosts = async (count = 20) => {
	const posts = await PostModel.find().limit(count);
	return posts.sort((a, b) => (b.createdAt as any) - (a.createdAt as any));
};

export const getUserPosts = async (userId: string) => {
	const posts = await PostModel.find({ userId: userId });
	return posts;
};

// Feed containing user's own posts as well as posts from other users they follow
export const getFeed = async (userId: string) => {
	const user = await UserModel.findById(userId);
	const following = user?.following;

	const userPosts = await getUserPosts(userId);

	if (!following || following.length === 0) {
		return userPosts;
	}

	const feed = await Promise.all(
		following.map(async (id) => {
			const video = await PostModel.find({ userId: new mongoose.Types.ObjectId(id) });
			return video;
		})
	);

	return userPosts
		.concat(feed[0])
		.flat()
		.sort((a, b) => (b.createdAt as any) - (a.createdAt as any));
};

export async function postsSearch(query: string, limit = 20) {
	const posts = await PostModel.find({
		description: { $regex: query, $options: 'i' }
	}).limit(limit);

	return posts;
}
