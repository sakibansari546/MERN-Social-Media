import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import { getDataURI } from "../utils/dataUri.js";

export const createPost = async (req, res) => {
    const { caption } = req.body;
    const postImage = req.file;
    const userId = req.userId;
    console.log(postImage);

    try {
        if (!postImage) {
            return res.status(400).json({ message: "No image file provided" });
        }
        if (!caption) {
            return res.status(400).json({ message: "Caption is required" });
        }

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const fileUri = getDataURI(postImage);
        const cloudResponse = await cloudinary.uploader.upload(fileUri, { resource_type: 'image' });

        const newPost = new Post({
            caption,
            postImage: cloudResponse.secure_url,
            // postImage: fileUri,
            author: userId  // Fixed the typo here
        });

        user.posts.push(newPost._id);

        await newPost.save();  // Save the new post to the database
        await user.save();

        res.status(201).json({ message: "Post created successfully!", success: true });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author').sort({ createdAt: -1 });
        res.status(200).json({ message: "All Posts", success: true, posts });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};