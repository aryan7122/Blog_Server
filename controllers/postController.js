// postController.js
import Post from "../models/postModel.js"
import User from '../models/User.js'; // Assuming you have a User model
import Subscriber from '../models/subscriberModel.js';
import nodemailer from 'nodemailer';

// Create a new blog post and send Subscriber
// Function to create a new blog post and notify subscribers
export const createPost = async (req, res) => {
    const { title, content, url, description, category } = req.body;

    try {
        // Create new post
        const post = new Post({ title, content, url, description, category });
        await post.save();

        // Fetch all subscribers
        const subscribers = await Subscriber.find();
        const emailList = subscribers.map(subscriber => subscriber.email);

        // Prepare email content
        const emailSubject = `New Post Published: ${title}`;
        const blogPostLink = `https://aryanblog.vercel.app/post/${post._id}`; // Assuming post._id is the MongoDB ObjectId of the newly created post

        // HTML content for email
        const emailText = `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                    }
                    .post-image {
                        max-width: 100%;
                        height: auto;
                        margin-bottom: 20px;
                    }
                    .read-more-link {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Aryan Blog new post: <strong>${title}</strong></h2>
                    <img class="post-image" src="${url}" alt="Post Image">
                    <p>${description}</p>
                    <p><a class="read-more-link" href="${blogPostLink}">Read more</a></p>
                </div>
            </body>
            </html>
        `;

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail email address
                pass: process.env.EMAIL_PASS // Your Gmail password or app password
            }
        });

        // Send email to each subscriber
        emailList.forEach(email => {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: emailSubject,
                html: emailText // Use html instead of text for HTML content
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    res.status(500).json({ success: false, error: 'Internal Server Error', details: error.message });
                } else {
                    console.log('Email sent:', info.response);
                    res.status(200).json({ success: true, message: 'Email sent successfully' });
                }
            });
        });

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