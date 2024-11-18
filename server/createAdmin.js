const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/admin');  // Path to your Admin model (adjust if necessary)

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Create a new admin user
const createAdmin = async () => {
  const username = 'admin';  // Example username
  const password = 'password123';  // Example password

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({
    username,
    password: hashedPassword,
  });

  // Save the admin user to the database
  await newAdmin.save();
  console.log('Admin user created successfully!');
  mongoose.connection.close();  // Close the database connection after the task is done
};

// Call the createAdmin function
createAdmin();
