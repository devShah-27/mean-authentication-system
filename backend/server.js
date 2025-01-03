//Import required dependencies
const express = require("express"); // Express framework for building server
const mongoose = require("mongoose"); // Mongoose for MongoDB interaction
const cors = require("cors"); // CORS middleware for handling cross-origin requests
const dotenv = require("dotenv"); // Dotenv for loading and managing environment variables
const authRoutes = require("./routes/authRoutes"); // Import authentication routes

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an instance of Express app

//Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); //Parse incoming JSON requests into JavaScript objects

//MongoDB connection setup using Mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB"); // Log success message if connection is successful
  })
  .catch((err) => {
    console.log("MongoDB connection error: ", err); // Log error message if connection fails
  });

// Set up the authentication routes
app.use("/api/auth", authRoutes); // Handle authentication-related requests

//Start the Express server
const PORT = process.env.PORT || 5000; // Get the port number from environment variable or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
