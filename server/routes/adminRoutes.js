// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { adminLogin, verifyToken, getAllFeedbacks, updateFeedback, deleteFeedback } = require('../controllers/adminController');

// Admin login route
router.post('/login', adminLogin);

// Admin dashboard - Get all feedbacks (requires authentication)
router.get('/feedbacks', verifyToken, getAllFeedbacks);

// Admin update feedback (status & reply) route (requires authentication)
router.put('/feedback/update', verifyToken, updateFeedback);

// Admin to handle feedback deletion
router.delete('/feedback/delete', verifyToken, deleteFeedback);

module.exports = router;
