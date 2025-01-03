const mongoose = require("mongoose"); // Import mongoose for MongoDB interaction
const bcrypt = require("bcryptjs"); // Import bcrypt for hashing passwords

// Define the schema for the user data
const userSchema = new mongoose.Schema({
  email: {
    type: String, // The email will be a string
    required: true, // The email is required
    unique: true, //Email should be unique for each user
  },
  password: {
    type: String, // The password will be a string
    required: true, // Password is required for authentication
  },
  refreshToken: {
    type: String, // Refresh token will also be a string
  },
});

//Middleware: Hash the password before saving the user to the database
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified("password")) return next();

  //Hash the password using bcrypt with a salt rounds of 10
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Method to check if the provided password matches the stored password
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password); //Compare the provided password with the stored hashed password
};

//Create the User model from the schema
const User = mongoose.model("User", userSchema);

module.exports = User; //Export the User model
