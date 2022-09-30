import { Post, PostModel } from './post.model';

export const createPost = async (post: Omit<Post, 'userId' | 'likes'>, userId: string) => {
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

export async function likePost(userId: string, postId: string) {
	return await PostModel.findByIdAndUpdate(postId, {
		$addToSet: { likes: userId }
	});
}
