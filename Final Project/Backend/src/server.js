import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './apiRoutes.js';
import './database.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve the uploads directory as static

app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;