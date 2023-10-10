const { staffLoginService, staffRegisterService, staffProfileService, staffEmailUpdate, staffProfileUpdateService } = require("../services/staffService");
const staffModel = require("../models/staffModel");
const { passwordUpdateService, forgetPasswordService } = require("../services/commonUserService");
const { sendVerifyEmail, verifyEmail } = require("../utils/verifyEmail");
const { ValidationError, NotFoundError } = require('custom-error-handlers/error')


//!Send Email For Email Verification
exports.staffSendEmailForVerifyController = async (req, res, next) => {
    try {
        const { email, emailSubject } = req.body;

        const existingEmail = await staffModel.findOne({ email });

        if (!existingEmail) {
            throw new NotFoundError('Staff Not Found')
        }

        //!Call a function to send Mail
        await sendVerifyEmail(email, staffModel, emailSubject, 'staff')

        res.status(200).json({ status: "success", message: "Email Send Success For Verification" })
    } catch (error) {
        next(error);
    }
};

//!Verify Email For Email Verification
exports.staffVerifyEmailController = async (req, res, next) => {
    try {
        const { email, otp } = req.query;

        if (!email) {
            throw new ValidationError('Email is required');
        }
        if (!otp) {
            throw new ValidationError('Otp is required');
        }

        const existingEmail = await staffModel.findOne({ email });

        if (!existingEmail) {
            throw new ValidationError('Staff does not exist');
        }

        await verifyEmail(email, staffModel, otp);

        res.status(200).json({ status: 'success', massage: 'Email Verification Success' })
    } catch (error) {
        next(error);
    }

};


exports.staffRegisterController = async (req, res, next) => {
    try {
        const result = await staffRegisterService(req);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.staffLoginController = async (req, res, next) => {
    try {
        const result = await staffLoginService(req);

        if (result.status === 'success') {
            res.cookie('token', result.token);

            return res.status(200).json(result);
        }

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.staffProfileController = async (req, res, next) => {
    try {
        const result = await staffProfileService(req);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.staffEmailUpdateController = async (req, res, next) => {
    try {
        const result = await staffEmailUpdate(req);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.staffProfileUpdateController = async (req, res, next) => {
    try {
        const result = await staffProfileUpdateService(req);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.staffPasswordUpdateController = async (req, res, next) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        const staffId = req.headers.id;

        const result = await passwordUpdateService(
            staffModel, staffId, currentPassword, newPassword, confirmPassword
        );

        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

exports.staffForgetPasswordController = async (req, res, next) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        const result = await forgetPasswordService(staffModel, email, newPassword, confirmPassword);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};