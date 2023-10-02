const { sendOtpController, customerLoginController, customerLogoutController, customerProfileReadController, customerProfileUpdateController, customerPasswordUpdateController, customerSendOtpForChangeEmailController, customerEmailUpdateController } = require('../controllers/customerController');
const { isLogin, giveAccessTo } = require('../middlewares/auth');

const customerRouter = require('express').Router();

//!Customer Login
router.post('/customer/otp-send', sendOtpController);

router.post('/customer/login', customerLoginController);

router.get('/logout', customerLogoutController);

router.get('/profile', isLogin, giveAccessTo(['admin','customer']), customerProfileReadController);

router.put('/password-update', isLogin, giveAccessTo('customer'), customerPasswordUpdateController);

router.post('/profile-update', isLogin, giveAccessTo('customer'), customerProfileUpdateController);

router.post('/otp-send-for-update-email', isLogin, giveAccessTo('customer'), customerSendOtpForChangeEmailController);

router.post('/update-email', isLogin, giveAccessTo('customer'), customerEmailUpdateController);



module.exports = {customerRouter};