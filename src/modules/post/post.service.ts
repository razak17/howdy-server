import { Post, PostModel } from './post.model';

export const createPost = async (post: Omit<Post, 'userId' | 'likes'>, userId: string) => {
	const newPost = new PostModel({ ...post, userId });
	return await newPost.save();
};

export const updatePost = async (
	postId: string,
	update: Omit<Post, 'owner' | 'likes' | 'userId'>
) => {
	const updatedPost = await PostModel.findByIdAndUpdate(postId, { $set: update }, { new: true });

	return updatedPost;
};
