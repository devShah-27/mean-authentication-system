const jwt = require("jsonwebtoken"); // Import JWT for generating tokens
const User = require("../models/user"); // Import the User model
const dotenv = require("dotenv"); // Import dotenv for environment variables
const crypto = require("crypto"); // Import crypto for generating random strings
dotenv.config(); // Load environment variables from .env file

// Function to generate an access token (short-lived)
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, // Payload: user ID and email
    process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token
    { expiresIn: "15m" } // Token expiration time (15 minutes)
  );
};

// Function to generate a refresh token (long-lived)
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, // Payload: user ID and email
    process.env.REFRESH_TOKEN_SECRET, // Secret key for signing the refresh token
    { expiresIn: "7d" } // Token expiration time (7 days)
  );
};

// Register a new user
const register = async (req, res) => {
  const { email, password } = req.body; // Get email and password from request body

  try {
    //Check if the user already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send("User already exists"); // Return error if user exists

    // Create a new user and save to the database
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(500).send("Error registering user");
  }
};

// Log in an existing user and generate tokens
const login = async (req, res) => {
  const { email, password } = req.body; // Get email and password from request body

  try {
    //Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found"); // Return error if user not found

    //Check if the password is correct
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) return res.status(401).send("Invalid credentials"); // Return error if password is incorrect

    // Generate access and refresh tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    //Store the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    //Send back the tokens to the user
    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).send("Error logging in user");
  }
};

// Refresh the access token using the refresh token
const refresh = async (req, res) => {
  const { refreshToken } = req.body; // Get the refresh token from the request body
  if (!refreshToken) return res.status(403).send("Refresh token is required");

  try {
    //Find the user based on the refresh token
    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).send("Invalid refresh token"); // Return error if refresh token is invalid

    //Verify the refresh token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.status(403).send("Invalid refresh token"); // Return error if verification fails

        //Generate a new access token
        const accessToken = generateAccessToken(user);
        res.json({ accessToken }); // Send back the new access token
      }
    );
  } catch (err) {
    res.status(500).send("Error refreshing access token");
  }
};

// User logout: Delete the refresh token from the database
const logout = async (req, res) => {
  const { refreshToken } = req.body; // Get the refresh token from the request body

  if (!refreshToken) return res.status(400).send("Refresh token is required");

  try {
    //Find the user based on the refresh token
    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).send("Invalid refresh token");

    //Invalidate the token by deleting it from the database
    user.refreshToken = null;
    await user.save();

    res.status(200).send("User logged out successfully");
  } catch (err) {
    res.status(500).send("Error logging out user");
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    //Generate reset token and expiry
    const resetToken = crypto.randomBytes(32).toString("hex"); // Generate a random string of 32 characters
    user.resetToken = resetToken; // Store the reset token in the user document

    user.resetTokenExpiry = Date.now() + 3600000; // Set the token expiry to 1 hour from now
    await user.save();

    // Send the reset token to the user's email (mock implementation)
    console.log("Password reset token: ", resetToken);

    res.send("Password reset token sent to email");
  } catch (err) {
    res.status(500).send("Error requesting password reset");
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find the user based on the reset token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // Check if the token has expired (1 hour from now)
    });

    if (!user) return res.status(400).send("Invalid or expired token");

    // Update the user's password and clear the reset token
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.send("Password reset successfully");
  } catch (err) {
    res.status(500).send("Error resetting password");
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  requestPasswordReset,
  resetPassword,
}; // Export the controller functions
