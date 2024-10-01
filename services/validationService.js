exports.createUserValidation = (userDetails) => {
  let validationErrors = [];

  const requiredFields = {
    username: "Please enter a correct username",
    password: "Please enter a correct password",
    confirmPassword: "Please enter confirmation password",
    mobile: "Please enter a correct mobile number",
    firstName: "Please enter a correct first name",
    lastName: "Please enter a correct last name",
    emergencyContact: "Please enter an emergency contact number",
    dob: "Please enter a dob",
    gender: "Please enter a gender",
  };

  for (const [field, errorMessage] of Object.entries(requiredFields)) {
    if (!userDetails[field] || userDetails[field] === "") {
      validationErrors.push({
        field,
        message: errorMessage,
      });
    }
  }

  if (userDetails.password !== userDetails.confirmPassword) {
    validationErrors.push({
      field: userDetails.confirmPassword,
      message: "Passwords does not match in confirm password",
    });
  }

  return validationErrors;
};
