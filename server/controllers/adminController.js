// controllers/adminController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Feedback = require('../models/Feedback');
const Admin = require('../models/admin');  // Admin model to store admin data (optional if you use hardcoded credentials)

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

// Admin Login Controller
const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Find the admin user from database (if using a database)
        const admin = await Admin.findOne({ username });

        // Check if the admin exists and the password matches
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '1h' });

        // Send back the token and a success message
        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded;  // Attach decoded user info to the request object
        next();  // Proceed to the next middleware or route handler
    });
};

// Admin Dashboard - Get all feedbacks
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();  // Fetch all feedbacks from MongoDB
    res.json(feedbacks);  // Send feedbacks to admin
  } catch (err) {
    res.status(500).json({ message: 'Error fetching feedbacks', error: err });
  }
};


// Admin Dashboard - Update feedback (status & reply)
const updateFeedback = async (req, res) => {
    const { feedbackId, status, reply } = req.body;

    try {
        const feedback = await Feedback.findOne({ _id: feedbackId });  // Find feedback by feedbackId

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        // Update feedback status and reply
        feedback.status = status || feedback.status;
        feedback.reply = reply || feedback.reply;
        feedback.updatedAt = new Date();

        await feedback.save();  // Save updated feedback

        res.json({ message: 'Feedback updated successfully', feedback });
    } catch (err) {
        res.status(500).json({ message: 'Error updating feedback', error: err });
    }
};

// Admin Dashboard - Delete feedback
const deleteFeedback = async (req, res) => {
    const { feedbackId } = req.body;

    try {
        const feedback = await Feedback.findByIdAndDelete(feedbackId);  // Delete feedback by feedbackId

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        res.json({ message: 'Feedback deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting feedback', error: err });
    }
};

module.exports = { 
    adminLogin, 
    verifyToken, 
    getAllFeedbacks, 
    updateFeedback, 
    deleteFeedback 
};
