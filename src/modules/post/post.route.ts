import express, { Request, Response } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import requireUser from '../../middleware/requireUser';
import {
	createPostHandler,
	getPostHandler,
	updatePostHandler,
	deletePostHandler
} from './post.controller';
import { createPostSchema, updatePostSchema } from './post.schema';

export const helloController = (req: Request, res: Response) => {
	res.send({ status: 'ok' });
};

const router = express.Router();

// Create Post
router.post('/', requireUser, processRequestBody(createPostSchema.body), createPostHandler);

// Get Post
router.get('/:postId', getPostHandler);

// Update Post
router.put('/:postId', requireUser, processRequestBody(updatePostSchema.body), updatePostHandler);

// Delete Post
router.delete('/:postId', requireUser, deletePostHandler);

// Like Post
router.put('/:postId/like', requireUser, helloController);

// Get User Post Timeline
router.get('/:userId/timeline', helloController);

export default router;
