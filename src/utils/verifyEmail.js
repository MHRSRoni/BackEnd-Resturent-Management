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
        await dataModel.updateOne({ _id: id }, { $set: { otp } });
    } else {
        await dataModel.updateOne({ email }, { $set: { otp } });
    }

    return { status: 'Success', massage: 'Verification Email Send Success' }

};

exports.verifyEmail = async (email, dataModel, otp, id) => {

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
            await dataModel.updateOne({ _id: id }, { $set: { otp: '0' } })
        } else {
            await dataModel.updateOne({ email: email }, { $set: { otp: '0' } })
            await dataModel.updateOne({ email: email }, { $set: { status: 'verified' } })
        }

    } else {
        throw new ValidationError('The OTP you provided is incorrect.')
    }

};