const { sendOtpController, customerLoginController, customerLogoutController, customerProfileReadController, customerProfileUpdateController, customerPasswordUpdateController, customerSendOtpForChangeEmailController, customerEmailUpdateController } = require('../controllers/customerController');
const { isLogin, giveAccessTo } = require('../middlewares/auth');
const { cartRouter } = require('./cartRouter');
const { complainRouter } = require('./complainRouter');
const { reviewRouter } = require('./reviewRouter');
const { wishRouter } = require('./wishRouter');

const customerRouter = require('express').Router();

//!Customer Login
customerRouter.post('/customer/otp-send', sendOtpController);

customerRouter.post('/customer/login', customerLoginController);

customerRouter.get('/logout', customerLogoutController);

customerRouter.get('/profile', isLogin, giveAccessTo(['admin','customer']), customerProfileReadController);

customerRouter.put('/password-update', isLogin, giveAccessTo('customer'), customerPasswordUpdateController);

customerRouter.post('/profile-update', isLogin, giveAccessTo('customer'), customerProfileUpdateController);

customerRouter.post('/otp-send-for-update-email', isLogin, giveAccessTo('customer'), customerSendOtpForChangeEmailController);

customerRouter.post('/update-email', isLogin, giveAccessTo('customer'), customerEmailUpdateController);



//review router
customerRouter.use('/review', isLogin, reviewRouter)
//complain router
customerRouter.use('/complain', isLogin, complainRouter)
// wish router
customerRouter.use('/wish', isLogin, wishRouter)
//cart router
customerRouter.use('/cart', isLogin, cartRouter)
//order router
// customerRouter.use('/order', isLogin, orderRouter)




module.exports = {customerRouter};