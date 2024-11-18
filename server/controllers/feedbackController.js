const Feedback = require('../models/Feedback');
const { v4: uuidv4 } = require('uuid');

// Controller to handle feedback submission
const submitFeedback = async (req, res) => {
  try {
    const { name, email, message, category } = req.body;

    // Create a new feedback instance and save it to the database
    const newFeedback = new Feedback({
      name,
      email,
      message,
      category,
      feedbackId: uuidv4(),  // Generate unique feedback ID
      status: 'Pending',     // Default status
    });

    // Save the feedback to the database
    await newFeedback.save();

    // Send response with success message and the generated feedback ID
    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedbackId: newFeedback.feedbackId,
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
};

// Get all feedback
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    console.log('Feedback fetched:', feedbacks); // Log the fetched data
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Error fetching feedback', error });
  }
};

const getFeedbackById = async (req, res) => {
  try {
    const { feedbackId } = req.params; // Get feedbackId from URL parameters
    const feedback = await Feedback.findOne({ feedbackId }); // Find the feedback by its unique feedbackId

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' }); // Handle case where feedback is not found
    }

    console.log('Feedback fetched:', feedback); // Log the fetched data
    res.status(200).json(feedback); // Return the feedback details
  } catch (error) {
    console.error('Error fetching feedback:', error); // Log any errors
    res.status(500).json({ message: 'Error fetching feedback', error }); // Handle server errors
  }
};

// Controller for updating the reply to a specific feedback
const updateReply = async (req, res) => {
  const { feedbackId } = req.params;  // Get feedbackId from URL parameter
  const { reply } = req.body;         // Get reply from request body

  try {
    // Find feedback by feedbackId (which is a string, not ObjectId)
    const feedback = await Feedback.findOne({ feedbackId: feedbackId });

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Update the reply field
    feedback.reply = reply;
    await feedback.save();  // Save the updated feedback

    // Return the updated feedback in the response
    res.status(200).json({ message: 'Reply added successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error adding reply', error });
  }
};


// Controller to handle feedback update (status and reply)
// Controller to handle feedback update (status and reply)
const updateFeedback = async (req, res) => {
  const { feedbackId } = req.params;
  const { status, reply } = req.body;

  // Ensure at least one field (status or reply) is provided
  if (!status && !reply) {
    return res.status(400).json({ message: 'At least status or reply must be provided to update the feedback.' });
  }

  try {
    // Find and update the feedback by feedbackId
    const feedback = await Feedback.findOneAndUpdate(
      { feedbackId },
      { status, reply },
      { new: true } // To return the updated document
    );

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Return success response with updated feedback
    res.status(200).json({ message: 'Feedback updated successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};



module.exports = {
  submitFeedback,
  getAllFeedback,
  updateReply,
  updateFeedback,
  getFeedbackById
};
