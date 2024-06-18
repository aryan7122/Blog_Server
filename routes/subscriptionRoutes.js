import express from 'express';
import Subscriber from '../models/subscriberModel.js';

const router = express.Router();

router.post('/subscribe', async (req, res) => {
    const { email } = req.body;
    try {
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        res.status(201).json({ message: 'Subscribed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Subscription failed', error });
    }
});

export default router;
