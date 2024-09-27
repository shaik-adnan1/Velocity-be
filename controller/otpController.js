

exports.sendOtp = async ( req ,res ) => {
    try {
        res.status(200).json({"message":"Success otp"})
    } catch (error) {
        res.status(404).json({"message":"otp Failed"});
    }
}