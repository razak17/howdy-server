import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PostModel } from './post.model';
import { CreatePostBody, GetPostParams, UpdatePostBody, UpdatePostParams } from './post.schema';
import { createPost, findPostById, updatePost } from './post.service';

export const createPostHandler = async (
	req: Request<Record<string, unknown>, Record<string, unknown>, CreatePostBody>,
	res: Response
) => {
	const { _id: userId } = res.locals.user;

	try {
		const newPost = await createPost({ ...req.body }, userId);
		return res.status(StatusCodes.OK).json(newPost);
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
	}
};

export async function getPostHandler(
	req: Request<GetPostParams, Record<string, unknown>, Record<string, unknown>>,
	res: Response
) {
	const { postId } = req.params;
	try {
		const post = await findPostById(postId);
		return res.status(StatusCodes.OK).json(post);
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
	}
}
export const updatePostHandler = async (
	req: Request<UpdatePostParams, Record<string, unknown>, UpdatePostBody>,
	res: Response
) => {
	const { _id: userId } = res.locals.user;
	const { postId } = req.params;

	const post = await PostModel.findById(postId);

	if (!post) {
		return res.status(StatusCodes.NOT_FOUND).send('post not found.');
	}

	if (String(post.userId) !== String(userId)) {
		return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized.');
	}

	const updatedPost = await updatePost(postId, { ...req.body });
	return res.status(StatusCodes.OK).json(updatedPost);
};
