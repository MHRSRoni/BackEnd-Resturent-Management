const { staffRegisterController, staffLoginController, staffProfileController, staffOtpSendController, staffEmailUpdateController, staffProfileUpdateController, staffPasswordUpdateController } = require('../controllers/staffController');
const { isLogin, isStaff } = require('../middlewares/auth');

const staffRouter = require('express').Router();



router.post('/staff/register', staffRegisterController);

router.post('/staff/login', staffLoginController);

router.get('/staff/profile',  isLogin, giveAccessTo(['admin', 'staff']), staffProfileController);

router.post('/staff/otp-send', isLogin, giveAccessTo('staff'), staffOtpSendController);

router.put('/staff/email-update', isLogin, giveAccessTo('staff'), staffEmailUpdateController);

router.post('/staff/profile-update', isLogin, giveAccessTo('staff'), staffProfileUpdateController);

router.put('/staff/password-update', isLogin, giveAccessTo('staff'), staffPasswordUpdateController);


module.exports = {staffRouter};