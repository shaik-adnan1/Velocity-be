exports.createUserService = async (createUserDetails) => {
  // console.log("reqbody", req);
  const { username, mobile, fistName, lastName } = createUserDetails;

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
