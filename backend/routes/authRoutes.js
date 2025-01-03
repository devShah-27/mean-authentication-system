const express = require("express"); // Import express for creating routes
const router = express.Router(); // Create a new express router
const authController = require("../controllers/authController"); // Import the authentication controller

//Defie the routes for authentication
router.post("/register", authController.register); // Route for user registration
router.post("/login", authController.login); // Route for user login
router.post("/refresh", authController.refresh); // Route for refreshing access token

module.exports = router; // Export the router
