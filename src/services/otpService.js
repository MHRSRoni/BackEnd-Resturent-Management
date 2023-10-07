const SendEmail = require("../configs/SendEmail");
const { ValidationError } = require('custom-error-handlers/error');
const { Otp } = require("../utils/Otp");

//!Send Email For Verification Service
exports.sendOtpService = async (email, emailSubject, dataModel, id) => {
    if (!email) {
        return { status: "fail", error: "Email is required" }
    }


    const emailData = {
        to: email,
        subject: emailSubject,
        html: `Your OTP is: ${otp}.`
    }

    await SendEmail(emailData);

    

};

//!Verify Email Service
exports.verifyOtpService = async (email, otp, dataModel, id) => {

    let verify;

    if (id) {
        verify = await dataModel.findOne({ _id: id, otp });
    } else {
        verify = await dataModel.findOne({ email, otp });
    }

    if (verify) {
        const checkExpire = new Date().getTime() - verify.updatedAt;
        const expireTime = Math.floor(checkExpire / 1000);

        if (expireTime > 300) {
            throw new ValidationError('OTP is Expired. Please try again!')
        }

        if (id) {
            await dataModel.updateOne(
                { _id: id },
                { $set: { otp: '0' } }
            )
        } else {
            await dataModel.updateOne(
                { email: email },
                { $set: { otp: '0' } },
                { upsert: true }
            )
        }

    } else {
        throw new ValidationError('The OTP you provided is incorrect.')
    }
};