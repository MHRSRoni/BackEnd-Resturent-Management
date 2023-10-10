const { adminLoginController, adminProfileController, adminProfileUpdateController, adminEmailUpdateController, adminOtpSendController, adminPasswordUpdateController, getAllCustomerController, getAllStaffController, adminSendEmailForVerifyController, adminVerifyEmailController } = require('../controllers/adminController');
const { isLogin, isAdmin } = require('../middlewares/auth');
const { complainRouter } = require('./complainRouter');
const { customerRouter } = require('./customerRouter');
const { reviewRouter } = require('./reviewRouter');
const { staffRouter } = require('./staffRouter');
const adminRouter = require('express').Router();


adminRouter.post('/send-otp', adminSendEmailForVerifyController);

adminRouter.get('/verify-otp', adminVerifyEmailController);


//!Admin Login
adminRouter.post('/login', adminLoginController);

adminRouter.get('/profile', isLogin, isAdmin, adminProfileController);

adminRouter.post('/otp-send', adminOtpSendController);

adminRouter.put('/email-update', isLogin, isAdmin, adminEmailUpdateController);

adminRouter.post('/profile-update', isLogin, isAdmin, adminProfileUpdateController);

adminRouter.put('/password-update', isLogin, isAdmin, adminPasswordUpdateController);

adminRouter.get('/all-customers', isLogin, isAdmin, getAllCustomerController)

adminRouter.get('/all-staffs', isLogin, isAdmin, getAllStaffController);


//customer router
adminRouter.use('/customer', isLogin, customerRouter)
//staff router
adminRouter.use('/staff', isLogin, staffRouter)
//review router
adminRouter.use('/review', isLogin, reviewRouter)
//complain router
adminRouter.use('/complain', isLogin, complainRouter)
//order router
// adminRouter.use('/order', isLogin, orderRouter)







module.exports = { adminRouter };