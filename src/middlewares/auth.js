const jwt = require('jsonwebtoken');
const { ValidationError } = require('custom-error-handlers/error');
const adminModel = require('../models/adminModel');

//!Is Login
exports.isLogin = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            throw new ValidationError('You are not logged in')
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        req.headers.email = decoded.email
        req.headers.id = decoded.id
        req.headers.role = decoded.role


        next()
    } catch (error) {
        next(error);
    }
};

//!Is Admin
exports.isAdmin = async (req, res, next) => {
    try {
        const user = await adminModel.findOne({ id: req.headers.id });

        if (user == ! 'admin') {
            throw new ValidationError('You are not Admin')
        }


        next()
    } catch (error) {
        next(error);
    }
};

