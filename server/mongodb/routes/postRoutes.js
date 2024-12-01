import express from 'express';
import * as dotenv from 'dotenv';
import { Storage } from '@google-cloud/storage';
import Post from '../models/post.js';
import fs from 'fs';

dotenv.config();

const router = express.Router();

// Google Cloud Storage configuration
const storage = new Storage({
    keyFilename: process.env.GCLOUD_KEY_FILE,  // Path to the service account key file
    projectId: process.env.GCLOUD_PROJECT_ID,  // Your project ID
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET); // Your bucket name

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

        // If the photo is base64, we'll convert it to a buffer and upload it
        if (photo) {
            const buffer = Buffer.from(photo.split(',')[1], 'base64');
            const fileName = `${Date.now()}.jpg`; // You can customize the file name

            // Upload the image to Google Cloud Storage
            const file = bucket.file(`images/${fileName}`);

            // Upload the image with a public read permission
            await file.save(buffer, { contentType: 'image/jpeg', public: true });

            // Generate the public URL for the uploaded image
            const publicUrl = `https://storage.googleapis.com/${process.env.GCLOUD_STORAGE_BUCKET}/images/${fileName}`;

            // Create the post with the secure image URL
            const newPost = await Post.create({
                name,
                prompt,
                photo: publicUrl, // Use the public URL from Google Cloud
            });

            res.status(201).json({ success: true, data: newPost });
        }
    } catch (error) {
        console.error('Error during image upload or post creation:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
