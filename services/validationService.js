exports.createUserValidation = (userDetails) => {
  let validationErrors = [];

  const requiredFields = {
    username: "Please enter a correct username",
    password: "Please enter a correct password",
    mobile: "Please enter a correct mobile number",
    fistName: "Please enter a correct first name",
    lastName: "Please enter a correct last name",
  };

  for (const [field, errorMessage] of Object.entries(requiredFields)) {
    if (!userDetails[field] || userDetails[field] === "") {
      validationErrors.push({
        field,
        message: errorMessage,
      });
    }
  }

  const passwordRegex = /^[a-zA-Z\d_!@#$%^&*]{8,15}$/;

  console.log("userDetails.password", userDetails.password);
  if (!passwordRegex.test(userDetails.password)) {
    validationErrors.push({
      field: "password",
      message:
        "Password must be between 8 and 15 characters long, and can only contain letters, numbers, underscores (_), and special characters (!@#$%^&*)",
    });
  }

  if (userDetails.password !== userDetails.confirmPassword) {
    validationErrors.push({
      field: "confirmPassword",
      message: "Passwords do not match in confirm password",
    });
  }

  return validationErrors;
};
