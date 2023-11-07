const { CreateToken } = require('../configs/CreateToken');
const bcrypt = require('bcrypt');
const customerModel = require("../models/customerModel");
const customerProfileModel = require("../models/customerProfileModel");
const { ValidationError, NotFoundError, AuthenticationError } = require('custom-error-handlers/error');
const { sendVerifyEmail, verifyEmail } = require('../utils/verifyEmail');
const { userValidation } = require('../validation/userValidation');


//!Customer Register Service
exports.customerRegisterService = async (req) => {
    const { username, email, password, confirmPassword } = req.body;

    userValidation(username, email, password, confirmPassword);

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
    const { email, otp, emailSubject } = req.query;

    if (!email) {
        throw new ValidationError('Email is required');
    }
    if (!otp) {
        throw new ValidationError('Otp is required');
    }

    await verifyEmail(email, customerModel, otp, emailSubject);

    return { status: 'Success', massage: 'Email Verification Success' }

};

//!Customer Login
exports.customerLoginService = async (req) => {

    const { email, username, password } = req.body;

    let customer;
    let user;
    let userImage;

    if (username) {
        //!Find Customer With Username
        customer = await customerModel.findOne({ username });

        if (!customer) {
            throw new NotFoundError('Customer Not Found')
        }

        user = await customerModel.findOne({ username },
            { username: 1, email: 1, status: 1, ban: 1, role: 1, _id: 0 });

        userImage = await customerProfileModel.findOne(
            { customerId: customer._id },
            { profilePic: 1, _id: 0 });

        //!Match Password to Provided Password
        const isMatch = await bcrypt.compare(password, customer.password);

        if (!isMatch) {
            throw new ValidationError('Username or Password incorrect')
        }

    } if (email) {
        //!Find Customer With Email
        customer = await customerModel.findOne({ email });

        if (!customer) {
            throw new NotFoundError('Customer Not Found')
        }

        user = await customerModel.findOne({ email },
            { username: 1, email: 1, status: 1, ban: 1, role: 1, _id: 0 });

        userImage = await customerProfileModel.findOne(
            { customerId: customer._id },
            { profilePic: 1, _id: 0 });

        //!Match Password to Provided Password
        const isMatch = await bcrypt.compare(password, customer.password);

        if (!isMatch) {
            throw new ValidationError('Email or Password incorrect')
        }

    }

    if (customer.status !== 'verified') {
        throw new AuthenticationError('Your Email is not verified. Please Verify your email')
    }

    if (customer.ban === true) {
        throw new ValidationError('You are ban. Please contact with admin.')
    }

    //!Create Token
    const token = await CreateToken(
        customer.email, customer._id, customer.role,
        '24h'
    );

    return {
        status: "success",
        massage: "Login Seccess",
        data: {
            username: user.username,
            email: user.email,
            status: user.status,
            role: user.role,
            ban: user.ban,
            image: userImage
        },
        token
    };

};

//!Customer Logout
exports.customerLogoutService = async () => {
    return {
        status: "success",
        massage: "Logout Success"
    };
};

//!Customer Profile Service
exports.customerProfileService = async (req) => {

    //!Find Customer Profile
    const profile = await customerProfileModel.findOne({
        customerId: req.headers.id
    });

    if (!profile) {
        throw new NotFoundError('Customer profile not found')
    }

    return { status: "success", data: profile }
};

//!Customer Profile Update Service
exports.customerProfileUpdateService = async (req) => {
    const { firstName, lastName, gender, address, profilePic } = req.body;
    const customerId = req.headers.id;

    if (!firstName) {
        throw new ValidationError('First Name is required')
    }
    if (!lastName) {
        throw new ValidationError('Last Name is required')
    }
    if (!phoneNo) {
        throw new ValidationError('Phone Number is required')
    }
    if (!gender) {
        throw new ValidationError('Gender is required')
    }
    if (!address) {
        throw new ValidationError('Address is required')
    }
    if (!profilePic) {
        throw new ValidationError('Profile Picture is required')
    }

    //!Find And Update Customer Profile
    await customerProfileModel.updateOne(
        { customerId },
        { customerId, firstName, lastName, gender, address, profilePic },
        { upsert: true }
    );

    return { status: "success", message: "Profile Save Changed!" };
};

//!Customer Password Update
exports.customerPasswordUpdate = async (req) => {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email) {
        throw new ValidationError('Email is required')
    }
    if (!newPassword) {
        throw new ValidationError('New Password is required')
    }
    if (newPassword.length < 6) {
        throw new ValidationError('New Password must be at least 6 characters long')
    }
    if (!confirmPassword) {
        throw new ValidationError('Confirm Password is required')
    }
    if (!(newPassword === confirmPassword)) {
        throw new ValidationError('New Password and Confirm Password must be same')
    }

    //!Password Hash
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    //!find And Update Customer Password
    const passwordReset = await customerModel.findOneAndUpdate(
        { email, 'otp.type': 'Password Reset' },
        { $set: { password: hashedPassword, 'otp.type': 'nai' } }

    );

    if (!passwordReset) {
        throw new ValidationError('Password Reset Verification Failed')
    }

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








