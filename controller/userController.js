const { createUserProfileService } = require("../services/userService");
const { createUserService } = require("../services/userService");
const { User } = require("../models/userModel");
const { successResponse } = require("../utils/customResponse");
const { getUserDetails } = require("../services/getUserDetailsService");

exports.validateNumber = async (req, res) => {
  const { mobile } = req.body;

  const userFetchData = { mobile };

  // Validating if the provided mobile exist
  const userDetails = await getUserDetails(userFetchData);

  if (userDetails) {
    console.log(`user exists in the DB ${userDetails}`);
    // returning the user details associated with the user
    // Tentative about the data to send!
    res.status(200).json(successResponse(userDetails));
  } else {
    // creating a new user with the mobile if (doesn't exist)!
    console.log(`user doesn't exists in the DB`);

    // create a user with the provided number!!!
    const createUserServiceResponse = await createUserService(mobile);
    console.log(
      "response user Controller => line: 27",
      createUserServiceResponse
    );

    // return success response
    res.status(200).json(successResponse(createUserServiceResponse));
  }
};

exports.createUserProfile = async (req, res) => {
  const userDetails = req.body;
  console.log("user details ", userDetails);

  const requiredDetails = [
    "mobile",
    "dob",
    "emergencyContact",
    "firstName",
    "gender",
    "lastName",
    "username",
  ];

  try {
    const userFetchData = { mobile: req.body.mobile };
    console.log("UserFetch data ", userFetchData);
    // Validating if the provided mobile exist
    const getUserDetailsServiceRes = await getUserDetails(userFetchData);

    console.log("getUserDetailsServiceRes", getUserDetailsServiceRes);

    if (getUserDetailsServiceRes) {
      const userProfileDetails = {};

      requiredDetails.map((cur) => {
        userProfileDetails[cur] = getUserDetailsServiceRes[cur];
      });

      console.log("userProfileDetails", userProfileDetails);

      return res.json(userProfileDetails);
    }

    // creates a user Profile
    const createUserProfileResponse = await createUserProfileService(
      userDetails
    );

    const userProfileDetails = {};

    requiredDetails.map((cur) => {
      userProfileDetails[cur] = createUserProfileResponse[cur];
    });

    return res.json(userProfileDetails);
  } catch (error) {
    console.log(`error while creating user -- Error: -- ${error}`);
    console.log(error);
    return res.status(400).json(error);
  }
};
