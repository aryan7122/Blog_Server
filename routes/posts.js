import express from 'express';
import Post from '../models/postModel';
const router = express.Router();

router.post('/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findByIdAndUpdate(postId, { $inc: { views: 1 } }, { new: true });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error incrementing view count' });
    }
});


module.exports = router;
