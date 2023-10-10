const { CreateToken } = require('../configs/CreateToken');
const bcrypt = require('bcrypt');
const customerModel = require("../models/customerModel");
const customerProfileModel = require("../models/customerProfileModel");
const { ValidationError, NotFoundError, AuthenticationError } = require('custom-error-handlers/error');
const { sendVerifyEmail, verifyEmail } = require('../utils/verifyEmail');


//!Customer Register Service
exports.customerRegisterService = async (req) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username) {
        throw new ValidationError('Username is required');
    }
    if (!email) {
        throw new ValidationError('Email is required');
    }
    if (!password) {
        throw new ValidationError('Password is required');
    }
    if (password.length < 6) {
        throw new ValidationError('Password must be at least 6 characters')
    }
    if (!confirmPassword) {
        throw new ValidationError('Confirm Password is required');
    }
    if (password !== confirmPassword) {
        throw new ValidationError('Password and Confirm Password must be the same')
    }

    //!Check Existing Username
    const existingUsername = await customerModel.findOne({ username });

    if (existingUsername) {
        throw new ValidationError('Username already exists')
    }

    //!Check Existing Username
    const existingEmail = await customerModel.findOne({ email });

    if (existingEmail) {
        throw new ValidationError('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await customerModel.create({
        username,
        email,
        password: hashedPassword
    });

    return { status: 'Success', message: 'Customer account has been Created!' }

};

//!Send Email For Email Verification
exports.sendEmailForVerify = async (req) => {
    const { email, emailSubject } = req.body;

    const existingEmail = await customerModel.findOne({ email });

    if (!existingEmail) {
        throw new NotFoundError('Customer Not Found')
    }

    //!Call a function to send Mail
    await sendVerifyEmail(email, customerModel, emailSubject, 'customer')

    return { status: "success", message: "Email Send Success For Verification" }
};

//!Verify Email For Email Verification
exports.verifyEmailService = async (req) => {
    const { email, otp } = req.query;

    if (!email) {
        throw new ValidationError('Email is required');
    }
    if (!otp) {
        throw new ValidationError('Otp is required');
    }

    const existingEmail = await customerModel.findOne({ email });

    if (!existingEmail) {
        throw new ValidationError('Customer does not exist');
    }

    await verifyEmail(email, customerModel, otp);

    return { status: 'Success', massage: 'Email Verification Success' }

};

//!Customer Login
exports.customerLoginService = async (req) => {

    const { email, username, password } = req.body;

    if (username) {
        //!Find Customer With Username
        const customer = await customerModel.findOne({ username });

        if (!customer) {
            throw new NotFoundError('User Not Found')
        }

        //!Match Password to Provided Password
        const isMatch = await bcrypt.compare(password, customer.password);

        if (!isMatch) {
            throw new ValidationError('Username or Password incorrect')
        }

        if (customer.status !== 'verified') {
            throw new AuthenticationError('Your Email is not verified. Please Verify your email')
        }

        //!Create Token
        const token = await CreateToken(
            customer.email, customer._id, customer.role,
            '24h'
        );

        const findUsername = await customerModel.findOne({ username }, { username: 1, _id: 0 })

        return {
            status: "success",
            massage: "Login Seccess",
            data: findUsername,
            token
        };
    } else if (email) {
        // !Find Customer With Email
        const customer = await customerModel.findOne({ email });

        if (!customer) {
            throw new NotFoundError('User Not Found')
        }

        //!Match Password to Provided Password
        const isMatch = await bcrypt.compare(password, customer.password);

        if (!isMatch) {
            throw new ValidationError('Email or Password incorrect')
        }

        if (customer.status !== 'verified') {
            throw new AuthenticationError('Your Email is not verified. Please Verify your email')
        }

        //!Create Token
        const token = await CreateToken(
            email, customer._id, customer.role,
            '24h'
        );

        const findUsername2 = await customerModel.findOne({ email }, { username: 1, _id: 0 });

        return {
            status: "success",
            massage: "Login Seccess",
            data: findUsername2,
            token
        };
    } else {
        return { massage: "Something went wrong" }
    }
};

//!Customer Logout
exports.customerLogoutService = () => {
    return {
        status: "success",
        massage: "Logout Success"
    };
};

//!Customer Profile Service
exports.customerProfileService = async (req) => {

    //!Find Customer Profile
    const profile = await customerProfileModel.find({
        customerId: req.headers.id
    });

    if (!profile) {
        throw new NotFoundError('Customer profile not found')
    }

    return { status: "success", data: profile }
};

//!Customer Profile Update Service
exports.customerProfileUpdateService = async (req) => {
    const reqBody = req.body;
    const customerId = req.headers.id;

    //!Push Customer ID
    reqBody.customerId = customerId

    //!Find And Update Customer Profile
    const profile = await customerProfileModel.updateOne(
        { customerId },
        { $set: reqBody },
        { upsert: true }
    );

    return { status: "success", message: "Profile Save Changed!", data: profile };
};

//!Customer Password Update
exports.customerPasswordUpdate = async (req) => {
    const { password, confirmPassword } = req.body;
    const customerEmail = req.headers.email;

    if (!password) {
        throw new ValidationError('Password is required')
    }
    if (password.length < 6) {
        throw new ValidationError('Password must be at least 6 characters long')
    }
    if (!confirmPassword) {
        throw new ValidationError('Confirm Password is required')
    }
    if (!(password === confirmPassword)) {
        throw new ValidationError('Password and Confirm Password must be same')
    }

    //!Password Hash
    const hashedPassword = await bcrypt.hash(password, 12)

    //!find And Update Customer Password
    await customerModel.updateOne({ email: customerEmail }, { $set: { password: hashedPassword } }, { upsert: true });

    return { status: "success", message: "Password Save Changed!" }

};

//!customer Email Update Service
exports.customerEmailUpdateService = async (req) => {
    const { email } = req.body;
    const customerId = req.headers.id;

    if (!email) {
        throw new ValidationError('Email is required')
    }

    const emailUpdate = await customerModel.updateOne(
        { _id: customerId },
        { email }
    );

    if (!emailUpdate) {
        throw new ValidationError('Email update failed')
    }

    return { status: 'Success', massage: 'Email has been Updated' }
};








