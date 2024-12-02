import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './mongodb/routes/postRoutes.js';
import dalleRoutes from './mongodb/routes/dalleRoutes.js';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();

// CORS Configuration
const corsOptions = {
    origin: `${process.env.CLIENT_URL}`, // Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Handle preflight (OPTIONS) requests for CORS
app.options('*', cors(corsOptions));  // Preflight request handling

// Parse incoming requests with JSON body
app.use(express.json({ limit: '50mb' }));

// API routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// Simple test route
app.get('/', (req, res) => {
    res.send('Hello From DALL-E');
});

// Connect to MongoDB
const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
};
startServer();



// Start the server and listen on the correct port
const port = process.env.PORT || 8080;  // Dynamic port on Render
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
