// models/Feedback.js

const mongoose = require('mongoose');

// Define the feedback schema
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Complaint', 'Suggestion', 'Compliment'],
    required: true,
  },
  message: {  // Change 'message' to 'feedback'
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending',
  },
  reply: {
    type: String,
    default: '',
  },
  feedbackId: {
    type: String,
    unique: true,
    required: true,
  },
}, { timestamps: true });


// Create and export the Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
