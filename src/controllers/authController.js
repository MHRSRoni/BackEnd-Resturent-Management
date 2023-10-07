const { sendOtpService, verifyOtpService, usernameAvailable } = require("../services/authService")

const sendOtpController = async (req, res, next) => {
    try {
        const username = req.query?.username
        const role = req.params?.role
        const identifier = req.query?.id || req.query?.email
        const subject = req.query?.subject || 'verification'

        const available = await usernameAvailable(username, role)
        if (!available) {
            return res.json({status : 'not available'})
        }
        const data = await sendOtpService(role, identifier, subject)
        return res.json(data)

    } catch (error) {
        next(error)
    }
}

const verifyOtpController = async (req, res, next) => { 
    try {
        
        const role = req.params?.role
        const identifier = req.query?.id || req.query?.email
        const code = req.query?.otp

        
        const data = await verifyOtpService(code, role, identifier)
        return res.json(data)

    } catch (error) {
        next(error)
    }
}



module.exports = {
    sendOtpController,
    verifyOtpController
}