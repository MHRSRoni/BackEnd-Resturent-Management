const { customerLogin, sendOtpController, verifyOtpController, customerLoginWithPasswordController, customerLogoutController, customerProfileReadController, customerProfileUpdateController, customerPasswordUpdateController } = require('../controllers/customerController');
const { isLogin } = require('../middlewares/auth');

const router = require('express').Router();

//!Customer Login
router.post('/otp-send', sendOtpController);

router.get('/otp-verify', verifyOtpController);

router.post('/login-with-password', customerLoginWithPasswordController);



router.get('/logout', customerLogoutController);

router.put('/customer/password-update', isLogin, customerPasswordUpdateController);

router.post('/customer/profile-update', isLogin, customerProfileUpdateController);

router.get('/customer/profile', isLogin, customerProfileReadController);


module.exports = router;