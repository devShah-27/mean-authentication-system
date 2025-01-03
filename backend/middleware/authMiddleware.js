const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware to verify the JWT access token.
const verifyToken = (req, res, next) => {
  // Extract the token from the authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is required" }); // 401 Unauthorized
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" }); // 403 Forbidden
    }

    try {
      // Find the user based on the decoded token payload
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" }); // 404 Not Found
      }

      req.user = user; // Attach the user object to the request for later use
      next(); // Continue to the next middleware or route handler
    } catch (err) {
      console.log("Error verifying token: ", err);
      res.status(500).json({ message: "Internal Server Error" }); // 500 Internal Server Error
    }
  });
};

// Middleware to check if the user's role matches the required roles.
// @param {Array} roles - List of allowed roles (e.g., ['admin']).
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    }
    next(); // User has the required role, proceed to the next middleware or route handler
  };
};

module.exports = { verifyToken, checkRole };