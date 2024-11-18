// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const feedbackRoutes = require('./routes/feedbackRoutes');
const adminRoutes = require('./routes/adminRoutes');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Load environment variables

dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Basic route
app.get('/', (req, res) => {
  res.send('Customer Feedback Tracker API is running');
});

// Create a transport object using your email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Get email from environment variable
    pass: process.env.EMAIL_PASS,  // Get password from environment variable
  },
})

// Example POST route to submit feedback and send email
app.post('/api/feedback', async (req, res) => {
  try {
      const { name, email, category, message } = req.body;

      // Create a feedback object
      const feedback = new Feedback({
          name,
          email,
          category,
          message,
          feedbackId: `FB-${Date.now()}`, // Generate a unique ID
      });

      // Save feedback to database
      const savedFeedback = await feedback.save();
      console.log("Feedback saved to database:", savedFeedback);

      // Send confirmation email
      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Your Feedback Submission Confirmation",
          text: `Dear ${name},\n\nThank you for submitting your feedback. Your feedback ID is: ${savedFeedback.feedbackId}. You can track your feedback status using this ID in the future.\n\nBest regards,\nThe Customer Feedback Tracker Team`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ message: "Feedback saved, but failed to send email." });
        } else {
            console.log("Email sent:", info.response);  // Log the email sending status
            return res.status(201).json({ message: "Feedback submitted successfully!" });
        }
    });
  } catch (err) {
      console.error("Error handling feedback submission:", err);
      res.status(500).json({ message: "Error submitting feedback. Please try again later." });
  }
});

// Generate feedback ID (this can be improved for uniqueness)
function generateFeedbackId() {
  return 'ID' + Date.now().toString(36);
}

// Use feedback routes
app.use('/api/feedback', feedbackRoutes);

// Use Admin Routes
app.use('/api/admin', adminRoutes);

// Set up the server to listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
