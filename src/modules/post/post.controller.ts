import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
	CreatePostBody,
	deletePostParams,
	dislikePostParams,
	GetPostParams,
	GetTimelineParams,
	likePostParams,
	UpdatePostBody,
	UpdatePostParams
} from './post.schema';
import {
	createPost,
	deletePost,
	dislikePost,
	findPostById,
	getFeed,
	likePost,
	updatePost
} from './post.service';

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

export const getPostHandler = async (
	req: Request<GetPostParams, Record<string, unknown>, Record<string, unknown>>,
	res: Response
) => {
	const { postId } = req.params;
	try {
		const post = await findPostById(postId);
		return res.status(StatusCodes.OK).json(post);
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
	}
};
export const updatePostHandler = async (
	req: Request<UpdatePostParams, Record<string, unknown>, UpdatePostBody>,
	res: Response
) => {
	const { _id: userId } = res.locals.user;
	const { postId } = req.params;

	const post = await findPostById(postId);

	if (!post) {
		return res.status(StatusCodes.NOT_FOUND).send('Post not found.');
	}

	if (String(post.userId) !== String(userId)) {
		return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized.');
	}

	const updatedPost = await updatePost(postId, { ...req.body });
	return res.status(StatusCodes.OK).json(updatedPost);
};

export const deletePostHandler = async (
	req: Request<deletePostParams, Record<string, unknown>, Record<string, unknown>>,
	res: Response
) => {
	const { _id: userId } = res.locals.user;
	const { postId } = req.params;

	const post = await findPostById(postId);

	if (!post) {
		return res.status(StatusCodes.NOT_FOUND).send('Post not found.');
	}

	if (String(post.userId) !== String(userId)) {
		return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized.');
	}
	await deletePost(postId);
	return res.status(StatusCodes.OK).send('Post deleted.');
};

export const likePostHandler = async (
	req: Request<likePostParams, Record<string, unknown>, Record<string, unknown>>,
	res: Response
) => {
	const { _id: userId } = res.locals.user;
	const { postId } = req.params;

	const post = await findPostById(postId);

	if (!post) {
		return res.status(StatusCodes.NOT_FOUND).send('Post not found.');
	}

	if (String(post.userId) !== String(userId)) {
		return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized.');
	}
	await likePost(userId, postId);
	return res.status(StatusCodes.OK).send('Post liked.');
};

export const dislikePostHandler = async (
	req: Request<dislikePostParams, Record<string, unknown>, Record<string, unknown>>,
	res: Response
) => {
	const { _id: userId } = res.locals.user;
	const { postId } = req.params;

	const post = await findPostById(postId);

	if (!post) {
		return res.status(StatusCodes.NOT_FOUND).send('Post not found.');
	}

	if (String(post.userId) !== String(userId)) {
		return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized.');
	}
	await dislikePost(userId, postId);
	return res.status(StatusCodes.OK).send('Post disliked.');
};

export const getFeedHandler = async (
	req: Request<GetTimelineParams, Record<string, unknown>, Record<string, unknown>>,
	res: Response
) => {
	const { userId } = req.params;

	try {
		const feed = await getFeed(userId);
		return res.status(StatusCodes.OK).json(feed);
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
	}
};
