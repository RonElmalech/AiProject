import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios'; // Import axios

dotenv.config();

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

        // Call Cloudflare API to generate an image using axios
        const response = await axios.post(CF_API_URL, input, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_TOKEN}`,
            },
            responseType: 'arraybuffer',  // Ensure the response is an ArrayBuffer for binary data
        });

        // Check for errors in the response
        if (response.status !== 200) {
            throw new Error('Error generating image from Cloudflare API');
        }

        // Check the Content-Type to ensure it's an image (e.g., image/png, image/jpeg)
        const contentType = response.headers['content-type'];
        if (contentType && contentType.startsWith('image/')) {
            // The response is an image, send it back as binary data
            res.set('Content-Type', contentType); // Set the correct content type
            res.status(200).send(response.data); // Send the image as the response
        } else {
            // Handle case where the response is not an image
            const result = response.data; // Get the error message from the response
            throw new Error(result.error || 'Unexpected response format');
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
