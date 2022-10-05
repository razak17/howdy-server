import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
import requireUser from '../../middleware/requireUser';
import {
	createPostHandler,
	getPostHandler,
  getRandomPostsHandler,
	updatePostHandler,
	deletePostHandler,
	likePostHandler,
	dislikePostHandler,
	getFeedHandler,
  getUserPostsHandler,
  postsSearchHandler
} from './post.controller';
import { createPostSchema, updatePostSchema } from './post.schema';

const router = express.Router();

// Create Post
router.post('/', requireUser, processRequestBody(createPostSchema.body), createPostHandler);

// Get Post
router.get('/find/:postId', getPostHandler);

// Get Random Posts
router.get('/explore/random', getRandomPostsHandler);

// Update Post
router.put('/:postId', requireUser, processRequestBody(updatePostSchema.body), updatePostHandler);

// Delete Post
router.delete('/:postId', requireUser, deletePostHandler);

// Like Post
router.put('/:postId/like', requireUser, likePostHandler);

// Dislike Post
router.put('/:postId/dislike', requireUser, dislikePostHandler);

// Get User Feed
router.get('/:userId/feed', requireUser, getFeedHandler);

// Posts Search
router.get("/search", requireUser, postsSearchHandler);

// Get User Posts
router.get('/user/:userId', requireUser, getUserPostsHandler);

export default router;
