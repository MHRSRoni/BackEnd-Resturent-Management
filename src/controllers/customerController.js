const customerModel = require("../models/customerModel");
const { customerLoginService, customerLogoutService, customerProfileUpdateService, customerProfileService, customerRegisterService, sendEmailForVerify, verifyEmailService, customerPasswordUpdate } = require("../services/customerSevice");
const { passwordUpdateService, emailUpdateService } = require("../services/commonUserService");

exports.customerRegisterController = async (req, res, next) => {
    try {
        const result = await customerRegisterService(req);

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
};

exports.customerSendVerifyEmailController = async (req, res, next) => {
    try {
        const result = await sendEmailForVerify(req);

        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

exports.customerVerifyEmailController = async (req, res, next) => {
    try {
        const result = await verifyEmailService(req);

        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

exports.customerLoginController = async (req, res, next) => {
    try {
        const result = await customerLoginService(req);

        if (result.status === 'success') {
            return res.cookie('token', result.token,
                {
                    sameSite: true,
                    maxAge: 86400000,
                    httpOnly: true,
                    secure: true
                }).status(200).json(result);
        }

    } catch (error) {
        next(error);
    }
};

exports.customerLogoutController = async (req, res, next) => {
    try {
        const result = await customerLogoutService(req);

        return res.clearCookie('token').status(200).json(result);

    } catch (error) {
        next(error);
    }
};

exports.customerProfileController = async (req, res, next) => {
    try {
        const result = await customerProfileService(req);

        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

exports.customerProfileUpdateController = async (req, res, next) => {
    try {
        const result = await customerProfileUpdateService(req);

        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

exports.customerPasswordUpdateController = async (req, res, next) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        const customerId = req.headers.id;

        const result = await passwordUpdateService(
            customerModel, customerId, currentPassword, newPassword, confirmPassword
        );

        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

exports.customerEmailUpdateController = async (req, res, next) => {
    try {
        const { email } = req.body;

        const customerId = req.headers.id;

        const result = await emailUpdateService(customerModel, customerId, email);

        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

exports.customerForgetPasswordController = async (req, res, next) => {
    try {

        const result = await customerPasswordUpdate(req);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
