const { validateRequestWithBody } = require("twilio/lib/webhooks/webhooks.js");
const { client } = require("../api/twilioClient.js");
const {
  successResponse,
  customResponse,
} = require("../utils/customResponse.js");
const constants = require("../constants/constants.js");

//   const { number } = req.body;
//   try {
//     client.verify.v2
//       .services("VA9391ad1effed1b94b84b0ba299a6faf4")
//       .verifications.create({ to: number, channel: "sms" })
//       .then((verification) =>
//         res.status(200).json(
//           successResponse({
//             status: verification.status,
//             message: "Otp sent successfully",
//           })
//         )
//       );
//   } catch (error) {
//     res
//       .status(404)
//       .json(
//         customResponse(constants.SUCCESS_CODE, "Failed to send OTP", error)
//       );
//   }
// };

// exports.testVerify = async (req, res) => {
//   const { code } = req.body;
//   try {
//     const verificationCheck = await client.verify.v2
//       .services("VA9391ad1effed1b94b84b0ba299a6faf4")
//       .verificationChecks.create({ to: "+917416279050", code });

//     return res.status(200).json(
//       successResponse({
//         status: verificationCheck.status,
//         message: "Verified Successfully",
//       })
//     );
//   } catch (error) {
//     res
//       .status(404)
//       .json(
//         customResponse(constants.FAILURE_CODE, "OTP verification Failed", error)
//       );
//   }
// };

exports.sendOtp = async (req, res) => {
  const { number } = req.body;
  if (!number || !/^\+\d{1,15}$/.test(number)) {
    return res
      .status(400)
      .json(
        customResponse(constants.FAILURE_CODE, "Invalid phone number format.")
      );
  }
  try {
    client.verify.v2
      .services(process.env.TWILIO_AUTH_SERVICE_TOKEN)
      .verifications.create({
        to: number,
        channel: "sms",
        body: "twilio otp verification",
      })
      .then((verification) =>
        res.status(200).json(
          successResponse({
            status: verification.status,
            message: "Otp sent successfully",
          })
        )
      );
  } catch (error) {
    res
      .status(404)
      .json(
        customResponse(constants.SUCCESS_CODE, "Failed to send OTP", error)
      );
  }
};

exports.verifyOtp = async (req, res) => {
  const { code } = req.body;
  try {
    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_AUTH_SERVICE_TOKEN)
      .verificationChecks.create({
        code,
        to: "+917416279050",
      });

    return res.status(200).json(
      successResponse({
        status: verificationCheck.status,
        message: "Verified Successfully",
      })
    );
  } catch (error) {
    res
      .status(404)
      .json(
        customResponse(constants.FAILURE_CODE, "OTP verification Failed", error)
      );
  }
};
