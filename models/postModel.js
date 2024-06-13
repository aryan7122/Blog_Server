import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    views: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    },
    likedByEmails: { // Change to array
        type: [String],
        default: []
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model("Post", postSchema);

export default Post; // Correct export syntax
