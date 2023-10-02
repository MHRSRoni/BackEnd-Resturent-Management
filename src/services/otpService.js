const SendEmail = require("../configs/SendEmail");
const { ValidationError } = require('custom-error-handlers/error')

//!Send Email For Verification Service
exports.sendOtpService = async (email, emailSubject, dataModel, id) => {
    if (!email) {
        return { status: "fail", error: "Email is required" }
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    // const verifyLink = `http://localhost:5000/api/v1/otp-verify?email=${email}&otp=${otp}`

    const emailData = {
        to: email,
        subject: emailSubject,
        html: `Your OTP is: ${otp}.`
    }

    await SendEmail(emailData);

    if (id) {
        await dataModel.updateOne({ _id: id }, { $set: { otp } }, { upsert: true });

    } else {
        await dataModel.updateOne({ email }, { $set: { otp } }, { upsert: true });
    }

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