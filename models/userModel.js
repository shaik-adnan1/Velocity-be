const mongoose = require("mongoose");

// ---- User Schema ---- //

const userSchema = new mongoose.Schema({
  // username (starts with letter, min 6 chars, only (chars, num, _, -))
  username: {
    type: String,
    required: [true, `User must have a username`],
    unique: true,
    match: [
      /^[a-zA-Z][a-zA-Z0-9_-]{5,}$/,
      "Username must start with a letter, contain at least 6 characters, and can only include letters, numbers, underscores, and hyphens",
    ],
  },
  // password (only characters,numbers and "_", minLenght: 8 and max: 15)
  password: {
    type: String,
    required: [true, "User must have a password"],
    minlength: [8, "Password must be at least 8 characters long"],
    maxlength: [15, "Password cannot exceed 15 characters"],
    match: [
      /^[a-zA-Z\d_]{8,15}$/,
      "Password must be between 8 and 15 characters long, and can only contain letters, numbers, and underscores (_)",
    ],
  },
  confirmPassword: {
    type: String,
    required: [true, "User must have a conforming password"],
    minlength: [8, "Password must be at least 8 characters long"],
    maxlength: [15, "Password cannot exceed 15 characters"],
    match: [
      /^[a-zA-Z\d_]{8,15}$/,
      "Password must be between 8 and 15 characters long, and can only contain letters, numbers, and underscores (_)",
    ],
  },
  mobile: {
    type: Number,
    required: [true, `User must have a username`],
    unique: true,
  },
  // firstName and lastName containing only characters
  firstName: {
    type: String,
    required: [true, `User must have a firstName`],
    match: [/^[a-zA-Z]+$/, "Last name must contain only letters"],
  },
  lastName: {
    type: String,
    required: [true, `User must have a lastName`],
    match: [/^[a-zA-Z]+$/, "Last name must contain only letters"],
  },
  emergencyContact: {
    type: String,
    required: [true, `User must have a EmergencyContact`],
    unique: true,
  },
  dob: {
    type: Date,
    required: [true, `User must enter a DOB`],
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
