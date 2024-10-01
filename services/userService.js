const User = require("../models/userModel");
const { createUserValidation } = require("../services/validationService");

exports.createUserService = async (userDetails) => {
  // console.log("reqbody", req);
  const { username, mobile, fistName, lastName } = userDetails;

  if (!username || username === "") {
    throw {
      status: "Failure",
      message: "Please enter a correct username",
      details: {
        message: "Incorrect username",
      },
    };
  }

  if (!mobile || mobile === "") {
    throw {
      status: "Failure",
      message: "Please enter a correct mobile",
      details: {
        message: "Incorrect mobile",
      },
    };
  }

  if (!fistName || fistName === "") {
    throw {
      status: "Failure",
      message: "Please enter a correct fistName",
      details: {
        message: "Incorrect fistName",
      },
    };
  }

  if (!lastName || lastName === "") {
    throw {
      status: "Failure",
      message: "Please enter a correct lastName",
      details: {
        message: "Incorrect lastName",
      },
    };
  }

  const createValidation = createUserValidation(userDetails);
  console.log(createValidation);

  const newUser = await User.create(userDetails);

  return {
    status: "Success",
    message: "Received user details",
    details: {
      username,
      mobile,
      fistName,
      lastName,
    },
  };
};
