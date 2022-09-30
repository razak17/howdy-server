import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PostBody } from './post.schema';
import { createPost } from './post.service';

export const createPostHandler = async (
	req: Request<Record<string, unknown>, Record<string, unknown>, PostBody>,
	res: Response
) => {
	const userId = res.locals.user._id;

	try {
		const newPost = await createPost({ ...req.body }, userId);
		return res.status(StatusCodes.OK).json(newPost);
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
	}
};
