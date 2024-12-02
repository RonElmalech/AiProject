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
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const input = { prompt };

        // Call Cloudflare API to generate an image using axios
        const response = await axios.post(CF_API_URL, input, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_TOKEN}`,
            },
            responseType: 'arraybuffer',
        });

        if (response.status !== 200) {
            throw new Error('Error generating image from Cloudflare API');
        }

        // Check for the image response
        const contentType = response.headers['content-type'];
        if (contentType && contentType.startsWith('image/')) {
            // Convert the image to base64
            const base64Image = `data:${contentType};base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
            return res.status(200).json({ imageBase64: base64Image });
        } else {
            const result = response.data;
            throw new Error(result.error || 'Unexpected response format');
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
