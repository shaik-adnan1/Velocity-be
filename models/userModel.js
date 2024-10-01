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
  },
  mobile: {
    type: Number,
    required: [true, `User must provide a mobile number`],
    unique: true,
  },
  // firstName and lastName containing only characters
  firstName: {
    type: String,
    required: [true, `User must provide a firstName`],
    match: [/^[a-zA-Z]+$/, "Last name must contain only letters"],
  },
  lastName: {
    type: String,
    required: [true, `User must provide a lastName`],
    match: [/^[a-zA-Z]+$/, "Last name must contain only letters"],
  },
  emergencyContact: {
    type: Number,
    required: [true, "User must provide an emergency contact"],
    unique: true,
  },
  dob: {
    type: Date,
    required: [true, "User must provide a date of birth"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "Please specify the gender"],
  },
});


const User = new mongoose.model("User", userSchema);

module.exports = User;
