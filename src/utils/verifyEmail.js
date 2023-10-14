const { ValidationError } = require('custom-error-handlers/error');
const { generateSignInOtpTemplate } = require('../mails');
const SendEmail = require('../configs/SendEmail');

exports.sendVerifyEmail = async (email, dataModel, emailSubject, role, id) => {

    const otp = Math.floor(100000 + Math.random() * 900000)

    const emailData = {
        to: email,
        subject: emailSubject,
        html: generateSignInOtpTemplate(email, otp, role)

    }

    await SendEmail(emailData);

    if (id) {
        await dataModel.findOneAndUpdate(
            { _id: id },
            { $set: { "otp.code": otp } }
        );
    } else {
        await dataModel.findOneAndUpdate(
            { email },
            { $set: { "otp.code": otp, 'otp.type': 'nai' } }
        );
    }

    return { status: 'Success', massage: 'Verification Email Send Success' }

};

exports.verifyEmail = async (email, dataModel, otp, emailSubject, id) => {

    let verify;

    if (id) {
        verify = await dataModel.findOne({ _id: id, 'otp.code': otp });
    } else {
        verify = await dataModel.findOne({ email, 'otp.code': otp });
    }

    if (verify) {
        const checkExpire = new Date().getTime() - verify.updatedAt;
        const expireTime = Math.floor(checkExpire / 1000);

        if (expireTime > 300) {
            throw new ValidationError('OTP is Expired. Please try again!')
        }

        if (id) {
            await dataModel.findOneAndUpdate(
                { _id: id }, { $set: { 'otp.code': '0' } }
            );
        } else {
            await dataModel.findOneAndUpdate(
                { email: email },
                { $set: { 'otp.code': '0', status: 'verified', 'otp.type': emailSubject } }
            )
        }

    } else {
        throw new ValidationError('The OTP you provided is incorrect.')
    }

};