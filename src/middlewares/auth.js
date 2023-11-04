const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('custom-error-handlers/error');
const adminModel = require('../models/adminModel');
const staffModel = require('../models/staffModel');

//!Is Login
exports.isLogin = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        console.log(token)

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_KEY);

            req.headers.email = decoded.email
            req.headers.id = decoded.id
            req.headers.role = decoded.role
        } else {
            throw new AuthorizationError('You are not logged in', 401)
        }

        next()
    } catch (error) {
        next(error);
    }
};

//!Is Admin
exports.isAdmin = async (req, res, next) => {
    try {
        const user = await adminModel.findOne({ _id: req.headers.id });

        if (user.role !== 'admin') {
            throw new AuthorizationError('You are not Admin')
        }

        next()
    } catch (error) {
        next(error);
    }
};

//!Is Staff
exports.isStaff = async (req, res, next) => {
    try {
        const user = await staffModel.findById({ _id: req.headers.id });

        if (user.role !== 'staff') {
            throw new AuthorizationError('You are not Staff')
        }
        next()
    } catch (error) {
        next(error);
    }
};

/**
 * permission giving middleware
 *
 * @param   {string|string[]}  role  the role you want to give access
 *
 */
exports.giveAccessTo = (role) => (req, res, next) => {

    try {
        //if role is string
        if (typeof role === 'string') {
            //match with user role
            if (role === req.headers.role) {
                //give access to the user
                next();
            } else {
                //check for next matched route
                next('route')
            }

            //if role is an Array
        } else if (role instanceof Array) {
            //match with user role
            if (role.includes(req.headers.role)) {
                //give access to the user
                next();
            } else {
                //check for next matched route
                next('route')
            }

            //if no role passed
        } else {
            throw new AuthorizationError('something went wrong')
        }

    } catch (e) {
        //pass error to the error handler
        next(e);
    }
}