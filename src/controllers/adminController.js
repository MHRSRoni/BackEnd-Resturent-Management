const { adminLoginService, adminProfileService, adminProfileUpdateService, adminEmailUpdate, adminOtpSendService, adminPasswordUpdateService } = require("../services/adminService");


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
        const result = await adminEmailUpdate(req);

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
        const result = await adminPasswordUpdateService(req);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



