const { adminLoginController, adminProfileController, adminProfileUpdateController, adminEmailUpdateController, adminOtpSendController, adminPasswordUpdateController } = require('../controllers/adminController');
const { isLogin, isAdmin } = require('../middlewares/auth');

const router = require('express').Router();


//!Admin Login
router.post('/admin/login', adminLoginController);

router.get('/admin/profile', isLogin, isAdmin, adminProfileController);

router.post('/admin/otp-send', isLogin, isAdmin, adminOtpSendController);

router.put('/admin/email-update', isLogin, isAdmin, adminEmailUpdateController);

router.post('/admin/profile-update', isLogin, isAdmin, adminProfileUpdateController);

router.put('/admin/password-update', isLogin, isAdmin, adminPasswordUpdateController);


module.exports = router;