// postController.js
import Post from "../models/postModel.js"
import User from '../models/User.js'; // Assuming you have a User model


// Create a new blog post
export const createPost = async (req, res) => {
    try {
        const { title, content, url, description, category } = req.body;
        const post = new Post({ title, content, url, description, category });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all blog posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error getting posts:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get blog post by ID
export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error("Error getting post:", error);
        res.status(500).json({ message: "Server error" });
    }
};
// create  views by ID
export const createViews = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Increment the views count
        post.views += 1;

        await post.save();
        res.status(200).json({ views: post.views });
    } catch (error) {
        console.error("Error updating views:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Function to retrieve views of a blog post by its ID
export const getViewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const views = post.views; // Retrieve views from the post object
        res.status(200).json({ views });
    } catch (error) {
        console.error("Error getting views:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// // create  like by ID
// export const createLike = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const post = await Post.findById(id);
//         if (!post) {
//             return res.status(404).json({ message: "Post not found" });
//         }
//         post.like += 1;
//         await post.save();
//         res.status(200).json({ likes: post.like });
//     } catch (error) {
//         console.error("Error updating likes:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

export const createLike = async (req, res) => {
    try {
        const { id } = req.params;
        const { userEmail } = req.body; // Get user email from request body

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.likedByEmails.includes(userEmail)) { // Check if user has already liked the post
            post.like -= 1;
            post.likedByEmails.remove(userEmail); // Add user email to likedByEmails array
            await post.save();
        } else {
            post.like += 1;
            post.likedByEmails.push(userEmail); // Add user email to likedByEmails array
            await post.save();
        }


        res.status(200).json({ likes: post.like });
    } catch (error) {
        console.error("Error updating likes:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Function to retrieve views of a blog post by its ID
export const getLikeById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const like = post.like; // Retrieve views from the post object
        res.status(200).json({ like });
    } catch (error) {
        console.error("Error getting views:", error);
        res.status(500).json({ message: "Server error" });
    }
};