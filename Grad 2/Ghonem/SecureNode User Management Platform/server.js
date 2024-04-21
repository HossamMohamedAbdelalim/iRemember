/*********** Setting up the server, Database connection, Middleware configurations, and Starting the server ***********/ 


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const userRoutes = require('./apiRoutes');

// Use cors middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming request bodies in JSON format
app.use(express.json());

// Database connection
require('./database');

// Use the API routes
app.use(userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});