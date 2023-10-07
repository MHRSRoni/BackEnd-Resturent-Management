const { sendOtpController, verifyOtpController } = require('../controllers/authController')

const authRouter = require('express').Router()

//query parmas email or id and subject
//example : http://backend.../send-verification/admin?email=example@example.com&subject='email verification'
authRouter.get('/send-verification/:role', sendOtpController)
//query parmas email or id and otp and subject
//example : http://backend.../verify/admin?email=example@example.com&otp=123456&subject='email verification'
authRouter.get('/verify/:role', verifyOtpController)

module.exports = { authRouter }