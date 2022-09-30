import express from 'express';
import { processRequestBody } from 'zod-express-middleware';

import requireUser from '../../middleware/requireUser';
import { createMessageHandler, getMessagesHandler } from './message.controller';
import { createMessageSchema } from './message.schema';

const router = express.Router();

// Create new message
router.post('/', requireUser, processRequestBody(createMessageSchema.body), createMessageHandler);

// Get messages
router.get('/:messageId', requireUser, getMessagesHandler);

export default router;
