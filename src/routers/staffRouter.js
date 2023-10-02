const { staffRegisterController, staffLoginController, staffProfileController, staffOtpSendController, staffEmailUpdateController, staffProfileUpdateController, staffPasswordUpdateController } = require('../controllers/staffController');
const { isLogin, giveAccessTo } = require('../middlewares/auth');

const staffRouter = require('express').Router();



staffRouter.post('/register', staffRegisterController);

staffRouter.post('/login', staffLoginController);

staffRouter.get('/profile',  isLogin, giveAccessTo(['admin', 'staff']), staffProfileController);

staffRouter.post('/otp-send', isLogin, giveAccessTo('staff'), staffOtpSendController);

staffRouter.put('/email-update', isLogin, giveAccessTo('staff'), staffEmailUpdateController);

staffRouter.post('/profile-update', isLogin, giveAccessTo('staff'), staffProfileUpdateController);

staffRouter.put('/password-update', isLogin, giveAccessTo('staff'), staffPasswordUpdateController);


module.exports = {staffRouter};