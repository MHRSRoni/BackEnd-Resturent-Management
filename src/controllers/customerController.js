const { sendOtpForLogin, customerLogin, customerLogout, customerProfileUpdate, customerPasswordUpdate, customerProfileRead } = require("../services/customerSevice");


exports.sendOtpController = async (req, res, next) => {
    try {
        const result = await sendOtpForLogin(req);

        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

exports.customerLoginController = async (req, res, next) => {
    try {
        const result = await customerLogin(req);

        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

exports.customerLogoutController = async (req, res, next) => {
    try {
        const result = await customerLogout(req);

        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

exports.customerProfileUpdateController = async (req, res, next) => {
    try {
        const result = await customerProfileUpdate(req);

        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

exports.customerPasswordUpdateController = async (req, res, next) => {
    try {
        const result = await customerPasswordUpdate(req);

        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

exports.customerProfileReadController = async (req, res, next) => {
    try {
        const result = await customerProfileRead(req);

        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};
