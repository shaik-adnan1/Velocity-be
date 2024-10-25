const bcrypt = require("bcryptjs");

const { User } = require("../models/userModel");
const constants = require("../constants/constants");
const {
  createUserProfileValidation,
} = require("../services/validationService");
const { mongooseErrorHandler } = require("../utils/mongooseErrorHandler");
const { successResponse, customResponse } = require("../utils/customResponse");

exports.createUserProfileService = async (userDetails) => {
  const { mobile } = userDetails;

  console.log("user details at 24", userDetails);

  if (!mobile) {
    return res
      .status(400)
      .json({ code: "0001", message: "Mobile number is required" });
  }

  const SALT_ROUNDS = 10;

  try {
    // validating user details if received, satisfies the requirements to create a profile
    const validationErrors = createUserProfileValidation(userDetails);
    if (validationErrors.length > 0) {
      return customResponse(
        constants.VALIDATION_ERROR,
        constants.FAILURE_STATUS,
        constants.INPUT_VALIDATION_FAIL,
        validationErrors
      );
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(userDetails.password, SALT_ROUNDS);
    userDetails.password = hashedPassword;

    // not storing confirm password into DB
    delete userDetails.confirmPassword;

    // Need to update this to the update function into database!!!
    // if any value for the userExists

    // Find the user by mobile number and update with the provided details
    const updatedUser = await User.findOneAndUpdate(
      { mobile },
      { $set: userDetails },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    console.log(`Successfully created user profile ${updatedUser}`);

    return successResponse({
      updatedUser,
    });
  } catch (error) {
    const normalizedError = mongooseErrorHandler(error);
    return customResponse(
      constants.VALIDATION_ERROR,
      constants.FAILURE_STATUS,
      normalizedError.message,
      normalizedError.details
    );

    // {
    //   code: constants.VALIDATION_ERROR,
    //   status: "Failure",
    //   message: normalizedError.message,
    //   details: normalizedError.details,
    // };
  }
};

exports.createUserService = async (mobile) => {
  console.log("mobile", mobile);

  // Need to update this to the update function into database!!! (Tentative)
  const newUser = new User({ mobile });
  await newUser.save();
  console.log("newUser", newUser);
  return newUser;
};
