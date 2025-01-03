const express = require("express"); // Import express for creating routes
const router = express.Router(); // Create a new express router
const authController = require("../controllers/authController"); // Import the authentication controller
const { verifyToken, checkRole } = require("../middleware/authMiddleware"); // Import middleware functions

//Define the routes for authentication
router.post("/register", authController.register); // Route for user registration
router.post("/login", authController.login); // Route for user login
router.post("/refresh-token", authController.refresh); // Route for refreshing access token
router.post("/logout", authController.logout); // Logout user
router.post("/request-reset", authController.requestPasswordReset); // Route for requesting password reset
router.post("/reset-password", authController.resetPassword); // Route for resetting password

// Admin-only route
router.get(
  "/admin-only",
  verifyToken, // Middleware to verify token
  checkRole(["admin"]), // Allow only admin role users
  (req, res) => {
    res.status(200).json({ message: "Welcome, Admin!" });
  }
);

module.exports = router; // Export the router
