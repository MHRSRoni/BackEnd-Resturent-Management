const { sendOtpController, customerLoginController, customerLogoutController, customerProfileReadController, customerProfileUpdateController, customerPasswordUpdateController, customerSendOtpForChangeEmailController, customerEmailUpdateController } = require('../controllers/customerController');
const { isLogin } = require('../middlewares/auth');

const router = require('express').Router();

//!Customer Login
router.post('/customer/otp-send', sendOtpController);

router.post('/customer/login', customerLoginController);

router.get('/logout', customerLogoutController);

router.get('/customer/profile', isLogin, customerProfileReadController);

router.put('/customer/password-update', isLogin, customerPasswordUpdateController);

router.post('/customer/profile-update', isLogin, customerProfileUpdateController);

router.post('/customer/otp-send-for-update-email', isLogin, customerSendOtpForChangeEmailController);

router.post('/customer/update-email', isLogin, customerEmailUpdateController);



module.exports = router;