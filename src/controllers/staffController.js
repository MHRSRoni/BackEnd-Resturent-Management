const { staffLoginService, staffRegisterService, staffProfileService, staffOtpSendService, staffEmailUpdate, staffProfileUpdateService, staffPasswordUpdateService } = require("../services/staffService");

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

exports.staffOtpSendController = async (req, res, next) => {
    try {
        const result = await staffOtpSendService(req);

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
        const result = await staffPasswordUpdateService(req);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};