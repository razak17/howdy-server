import { Post, PostModel } from './post.model';

export const createPost = async (post: Omit<Post, 'owner' | 'likes'>, owner: string) => {
	const newPost = new PostModel({ ...post, owner });
	return await newPost.save();
};
