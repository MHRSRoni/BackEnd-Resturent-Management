const { sendOtpController, customerLoginController, customerLogoutController, customerProfileReadController, customerProfileUpdateController, customerPasswordUpdateController } = require('../controllers/customerController');
const { isLogin } = require('../middlewares/auth');

const router = require('express').Router();

//!Customer Login
router.post('/otp-send', sendOtpController);

router.post('/customer/login', customerLoginController);

router.get('/logout', customerLogoutController);

router.put('/customer/password-update', isLogin, customerPasswordUpdateController);

router.post('/customer/profile-update', isLogin, customerProfileUpdateController);

router.get('/customer/profile', isLogin, customerProfileReadController);


module.exports = router;