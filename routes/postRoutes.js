import express from "express";
import { createPost, getAllPosts, getPostById, createViews, getViewsById, getLikeById, createLike } from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for creating a new blog post
router.post("/posts", createPost);


// Route for getting all blog posts
router.get("/posts", getAllPosts);

// Route for getting by id blog posts
router.get("/posts/:id", getPostById);

// Route for getting views of a blog post by ID
router.get("/views/:id", getViewsById);

// Route for creating a new blog post
router.post("/views/:id", createViews);

// Route for creating a new blog post
router.post("/like/:id",  createLike);

// Route for getting like of a blog post by ID
router.get("/like/:id", getLikeById);

export default router; // Correct export syntax
