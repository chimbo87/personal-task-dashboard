// server.js
// Entry point for the backend server

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());                    // Allow cross-origin requests
app.use(express.json());            // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas successfully!'))
    .catch((error) => console.error('❌ MongoDB connection error:', error));

// Test route - "Hello World" to verify server is working
app.get('/', (req, res) => {
    res.json({ message: '🚀 Personal Task Dashboard API is running!' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});