const mongoose = require("mongoose");

// ---- User Schema ---- //
const userSchema = new mongoose.Schema({
  mobile: {
    type: Number,
    required: [true, `User must provide a mobile number`],
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    sparse: true, // This allows null or missing values without causing duplication issues
    match: [
      /^[a-zA-Z][a-zA-Z0-9_-]{5,}$/,
      "Username must start with a letter, contain at least 6 characters, and can only include letters, numbers, underscores, and hyphens",
    ],
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
    match: [/^[a-zA-Z]+$/, "First name must contain only letters"],
  },
  lastName: {
    type: String,
    match: [/^[a-zA-Z]+$/, "Last name must contain only letters"],
  },
  emergencyContact: {
    type: Number,
    unique: true,
    sparse: true,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = { User };
