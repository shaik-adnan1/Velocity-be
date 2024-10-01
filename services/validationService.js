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

  return validationErrors;
};
