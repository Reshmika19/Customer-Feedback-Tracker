const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController'); // Import feedbackController correctly

// Route to submit feedback
router.post('/submit', feedbackController.submitFeedback);

// Route to get all feedback
router.get('/all', feedbackController.getAllFeedback);


// Route to update the category of a specific feedback by its ID
router.put('/update-feedback/:feedbackId', feedbackController.updateFeedback);

// Route to update the reply to a specific feedback by its ID
router.put('/update-reply/:feedbackId', feedbackController.updateReply);

router.get('/:feedbackId', feedbackController.getFeedbackById); // Dynamic route parameter for feedbackId

module.exports = router;
