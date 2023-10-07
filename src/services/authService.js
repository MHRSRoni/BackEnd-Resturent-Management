const { CreateToken } = require("../configs/CreateToken")
const SendEmail = require("../configs/SendEmail")
const { generateSignInOtpTemplate } = require("../mails")
const adminModel = require("../models/adminModel")
const customerModel = require("../models/customerModel")
const staffModel = require("../models/staffModel")
const { Otp } = require("../utils/Otp")


const sendOtpService = async (role, identifier, subject) => {

    

    const otp = new Otp({role , identifier })

    const saved = await otp.save()

    if (saved ) {
        const email = await otp.getEmail()
        const mailTemplate = generateSignInOtpTemplate(email, otp.code, role)
        const emailBody = {
            to : email,
            subject : subject,
            html : mailTemplate
        }
        SendEmail(emailBody)
        return {status : 'saved', otp : otp.code}
    }
    else {
        return {status : 'failed', }
    }
}

const verifyOtpService = async (code, role, identifier) => { 
    const otp = new Otp({role , identifier})

    const email = await otp.getEmail()
    const id = otp.isEmail ? null : identifier

    const verified = await otp.verify(code)
    if (verified ) {
        const token = await CreateToken(email, id, role, '24h')
        return {status : 'verified', token : token}
    }
    else {
        return {status : 'unverified'}
    }
}


const usernameAvailable = async (username, role) => {
    try {
        const model = role === 'admin' ? adminModel :
            role === 'customer' ? customerModel :
            role === 'staff' ? staffModel : null;
        const user = await model.findOne({username})
        if(user) {
            return false
        }

        return true;
    }
    catch (error) {
        return false
    }
}


module.exports = {
    sendOtpService,
    verifyOtpService,
    usernameAvailable
}