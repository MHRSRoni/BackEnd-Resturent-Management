const { staffRegisterController, staffLoginController, staffProfileController, staffOtpSendController, staffEmailUpdateController, staffProfileUpdateController, staffPasswordUpdateController } = require('../controllers/staffController');
const { isLogin, isStaff } = require('../middlewares/auth');

const router = require('express').Router();



router.post('/staff/register', staffRegisterController);

router.post('/staff/login', staffLoginController);

router.get('/staff/profile', isLogin, isStaff, staffProfileController);

router.post('/staff/otp-send', isLogin, isStaff, staffOtpSendController);

router.put('/staff/email-update', isLogin, isStaff, staffEmailUpdateController);

router.post('/staff/profile-update', isLogin, isStaff, staffProfileUpdateController);

router.put('/staff/password-update', isLogin, isStaff, staffPasswordUpdateController);


module.exports = router;