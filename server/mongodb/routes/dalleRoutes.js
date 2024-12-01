import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch'; // Import fetch for Cloudflare API calls

const cloudflareEnvPath = 'C:/Users/ronel/Desktop/AiProject/server/mongodb/routes/cloudflare.env'; 
dotenv.config({ path: cloudflareEnvPath });


const router = express.Router();
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const MODEL_ID = process.env.CLOUDFLARE_MODEL_ID;

const CF_API_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL_ID}`;



router.route('/generate-image').post(async (req, res) => {
    try {
        const { prompt } = req.body;  // Get the prompt from the request body

        // Validate the prompt input
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // Prepare the input for Cloudflare AI
        const input = {
            prompt: prompt,  // Only the prompt is needed
        };

        // Call Cloudflare API to generate an image
        const response = await fetch(CF_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_TOKEN}`,
            },
            body: JSON.stringify(input),  // Send the prompt
        });

        // Check for errors in the response
        if (!response.ok) {
            throw new Error('Error generating image from Cloudflare API');
        }

        // Check the Content-Type to ensure it's an image (e.g., image/png, image/jpeg)
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.startsWith('image/')) {
            // The response is an image, send it back as binary data
            const imageArrayBuffer = await response.arrayBuffer(); // Get image as ArrayBuffer
            res.set('Content-Type', contentType); // Set the correct content type
            res.status(200).send(Buffer.from(imageArrayBuffer)); // Send the image as the response
        } else {
            // Handle case where the response is not an image
            const result = await response.json(); // Try to parse as JSON
            throw new Error(result.error || 'Unexpected response format');
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;