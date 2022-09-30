import express, { Request, Response } from 'express';
import requireUser from '../../middleware/requireUser';
import { createPostHandler } from './post.controller';

export const helloController = (req: Request, res: Response) => {
	res.send({ status: 'ok' });
};

const router = express.Router();

// Create Post
router.post('/', requireUser, createPostHandler);

// Get Post
router.get('/:postId', helloController);

// Update Post
router.put('/:postId', requireUser, helloController);

// Delete Post
router.delete('/:postId', requireUser, helloController);

// Like Post
router.put('/:postId/like', requireUser, helloController);

// Get User Post Timeline
router.get('/:userId/timeline', helloController);

export default router;
