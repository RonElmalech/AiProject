import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './mongodb/routes/postRoutes.js';
import dalleRoutes from './mongodb/routes/dalleRoutes.js';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// API routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
    res.send('Hello From DALL-E');
});

// Connect to the database
const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
};
startServer();

// Export the handler for Netlify
export const handler = async (event, context) => {
    return new Promise((resolve, reject) => {
        app(event, context, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};
