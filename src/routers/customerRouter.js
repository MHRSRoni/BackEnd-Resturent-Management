const { customerLoginController, customerLogoutController, customerProfileController, customerProfileUpdateController, customerPasswordUpdateController, customerEmailUpdateController, customerRegisterController, customerSendVerifyEmailController, customerVerifyEmailController, customerForgetPasswordController } = require('../controllers/customerController');
const { isLogin, giveAccessTo } = require('../middlewares/auth');
const { cartRouter } = require('./cartRouter');
const { complainRouter } = require('./complainRouter');
const { reviewRouter } = require('./reviewRouter');
const { wishRouter } = require('./wishRouter');

const customerRouter = require('express').Router();

//!Customer Register
customerRouter.post('/register', customerRegisterController)

//!Send Email Verification
customerRouter.post('/send-verification', customerSendVerifyEmailController)

//!Verify Email Verification
customerRouter.get('/auth/verify', customerVerifyEmailController)

//!Customer Login
customerRouter.post('/login', customerLoginController);

//!Customer Logout 
customerRouter.get('/logout', customerLogoutController);

//!Customer Profile
customerRouter.get('/profile', isLogin, giveAccessTo(['admin', 'customer']), customerProfileController);

//!Customer Profile Update
customerRouter.post('/profile-update', isLogin, giveAccessTo('customer'), customerProfileUpdateController);

//!Customer Password Update
customerRouter.put('/password-update', isLogin, giveAccessTo('customer'), customerPasswordUpdateController);

//!Customer Email Update
customerRouter.post('/update-email', isLogin, giveAccessTo('customer'), customerEmailUpdateController);

//!Customer Forget Password
customerRouter.put('/forget-password', customerForgetPasswordController)


//!test
customerRouter.get('/test', (req, res) => {
    res.cookie('test', 'test')

    res.json({ success: true })
})



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




module.exports = { customerRouter };