// middleware/auth.js
// This middleware verifies the JWT token for protected routes

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        // Get token from the Authorization header
        // Format: "Bearer <token>"
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                message: 'Access denied. No token provided.' 
            });
        }

        // Extract the token
        const token = authHeader.split(' ')[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID (exclude the password)
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({ 
                message: 'User not found. Invalid token.' 
            });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                message: 'Invalid token. Please login again.' 
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: 'Token expired. Please login again.' 
            });
        }
        res.status(500).json({ 
            message: 'Authentication error', 
            error: error.message 
        });
    }
};

module.exports = auth;