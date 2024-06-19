// routers/subscriberRouter.js

import express from 'express';
import { getSubscribers, createSubscriber, deleteSubscriber } from '../controllers/subscriberController.js';

const router = express.Router();

// GET /api/subscribers
router.get('/Subscribers', getSubscribers);

// POST /api/subscribers
router.post('/Subscribers', createSubscriber);

// DELETE /api/subscribers/:id
router.delete('/Subscribers/:id', deleteSubscriber);

export default router;
