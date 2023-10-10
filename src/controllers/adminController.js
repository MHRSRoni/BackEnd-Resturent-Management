const adminModel = require("../models/adminModel");
const customerProfileModel = require("../models/customerProfileModel");
const { adminLoginService, adminProfileService, adminProfileUpdateService, adminOtpSendService } = require("../services/adminService");
const { ValidationError, NotFoundError } = require('custom-error-handlers/error');
const { passwordUpdateService, emailUpdateService } = require("../services/commonUserService");
const { sendVerifyEmail } = require("../utils/verifyEmail");


//!Send Email For Email Verification
exports.adminSendEmailForVerifyController = async (req, res, next) => {
    try {
        const { email, emailSubject } = req.body;

        const existingEmail = await adminModel.findOne({ email });

        if (!existingEmail) {
            throw new NotFoundError('Admin Not Found')
        }

        //!Call a function to send Mail
        await sendVerifyEmail(email, adminModel, emailSubject, 'admin')

        res.status(200).json({ status: "success", message: "Email Send Success For Verification" })
    } catch (error) {
        next(error);
    }
};

//!Verify Email For Email Verification
exports.adminVerifyEmailController = async (req) => {
    try {
        const { email, otp } = req.query;

        if (!email) {
            throw new ValidationError('Email is required');
        }
        if (!otp) {
            throw new ValidationError('Otp is required');
        }

        const existingEmail = await adminModel.findOne({ email });

        if (!existingEmail) {
            throw new ValidationError('Customer does not exist');
        }

        await verifyEmail(email, adminModel, otp);

        return { status: 'Success', massage: 'Email Verification Success' }
    } catch (error) {
        next(error);
    }

};


exports.adminLoginController = async (req, res, next) => {
    try {
        const result = await adminLoginService(req);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.adminProfileController = async (req, res, next) => {
    try {
        const result = await adminProfileService(req);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.adminOtpSendController = async (req, res, next) => {
    try {
        const result = await adminOtpSendService(req);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.adminEmailUpdateController = async (req, res, next) => {
    try {
        const { email } = req.body;

        const adminId = req.headers.id;

        const result = await emailUpdateService(adminModel, adminId, email);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.adminProfileUpdateController = async (req, res, next) => {
    try {
        const result = await adminProfileUpdateService(req);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.adminPasswordUpdateController = async (req, res, next) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        const adminId = req.headers.id;

        const result = await passwordUpdateService(
            adminModel, adminId, currentPassword, newPassword, confirmPassword
        );

        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

//!Get All Customer
exports.getAllCustomerController = async (req, res, next) => {
    try {
        const customers = await customerProfileModel.find();

        res.status(200).json(customers)
    } catch (error) {
        next(error);
    }
};

//!Get All Staff 
exports.getAllStaffController = async (req, res, next) => {
    try {
        const staffs = await staffModel.find();

        res.status(200).json(staffs)
    } catch (error) {
        next(error);
    }
};




