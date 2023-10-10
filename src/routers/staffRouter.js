const { staffRegisterController, staffLoginController, staffProfileController, staffEmailUpdateController, staffProfileUpdateController, staffPasswordUpdateController, staffSendEmailForVerifyController, staffVerifyEmailController, staffForgetPasswordController } = require('../controllers/staffController');
const { isLogin, giveAccessTo } = require('../middlewares/auth');

const staffRouter = require('express').Router();

staffRouter.post('/send-otp', staffSendEmailForVerifyController);

staffRouter.get('/auth/verify', staffVerifyEmailController);

staffRouter.post('/register', staffRegisterController);

staffRouter.post('/login', staffLoginController);

staffRouter.get('/profile', isLogin, giveAccessTo(['admin', 'staff']), staffProfileController);


staffRouter.put('/email-update', isLogin, giveAccessTo('staff'), staffEmailUpdateController);

staffRouter.post('/profile-update', isLogin, giveAccessTo('staff'), staffProfileUpdateController);

staffRouter.put('/password-update', isLogin, giveAccessTo('staff'), staffPasswordUpdateController);

staffRouter.put('/forget-password', staffForgetPasswordController)


module.exports = { staffRouter };