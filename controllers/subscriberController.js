// controllers/subscriberController.js

import Subscriber from '../models/subscriberModel.js';

// GET /api/subscribers - Get all subscribers
export const getSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/subscribers - Create a new subscriber
export const createSubscriber = async (req, res) => {
    const { email } = req.body;

    try {
        const newSubscriber = new Subscriber({ email });
        const savedSubscriber = await newSubscriber.save();
        res.status(201).json(savedSubscriber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/subscribers/:id - Delete a subscriber by ID
export const deleteSubscriber = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSubscriber = await Subscriber.findByIdAndDelete(id);
        if (deletedSubscriber) {
            res.json({ message: 'Subscriber deleted successfully' });
        } else {
            res.status(404).json({ message: 'Subscriber not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
