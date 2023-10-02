const { staffRegisterController, staffLoginController, staffProfileController, staffOtpSendController, staffEmailUpdateController, staffProfileUpdateController, staffPasswordUpdateController } = require('../controllers/staffController');
const { isLogin } = require('../middlewares/auth');

const staffRouter = require('express').Router();



router.post('/register', staffRegisterController);

router.post('/login', staffLoginController);

router.get('/profile',  isLogin, giveAccessTo(['admin', 'staff']), staffProfileController);

router.post('/otp-send', isLogin, giveAccessTo('staff'), staffOtpSendController);

router.put('/email-update', isLogin, giveAccessTo('staff'), staffEmailUpdateController);

router.post('/profile-update', isLogin, giveAccessTo('staff'), staffProfileUpdateController);

router.put('/password-update', isLogin, giveAccessTo('staff'), staffPasswordUpdateController);


module.exports = {staffRouter};