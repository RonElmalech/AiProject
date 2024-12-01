import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './mongodb/routes/postRoute.js';
import dalleRoutes from './mongodb/routes/dalleRoutes.js';
import path from 'path';
import { log } from 'console';


const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log(process.env.MONGODB_URL);  // Check MongoDB URL


const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.send('Hello From DALL-E');
});

const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => {
        console.log(`Server is started on http://localhost:8080`);
    });
    }
    catch (error) {
        console.log(error);
    }
    
}

startServer();

 