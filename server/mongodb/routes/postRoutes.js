import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../models/post.js';

dotenv.config();

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create a post
router.post('/', async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;

        // Check if the photo is base64 or a URL
        let photoUrl;

        if (photo) {
            // If the photo is a base64 string
            if (photo.startsWith('data:image')) {
                // Upload the base64 image to Cloudinary
                photoUrl = await cloudinary.uploader.upload(photo, { 
                    resource_type: 'auto' // Cloudinary will automatically detect the type
                });
            } else if (photo.startsWith('http')) {
                // If the photo is a URL (such as from DALL·E), upload it directly
                photoUrl = await cloudinary.uploader.upload(photo);
            }
        }

        // Create the post in the database
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url, // Store the URL of the uploaded image
        });

        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.error('Error during image upload or post creation:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
