const { CreateToken } = require("../configs/CreateToken");
const adminModel = require("../models/adminModel");
const { sendOtpService, verifyOtpService } = require("./otpService");
const bcrypt = require('bcrypt');
const { ValidationError } = require('custom-error-handlers/error')


//!Admin Login Service
exports.adminLoginService = async (req) => {
    const { email, password } = req.body;

    //!Find Admin With Email
    const admin = await adminModel.findOne({ email });

    if (!admin) {
        throw new ValidationError('User Not Found')
    }

    //!Match Password to Provided Password
    const isMatch = await bcrypt.compare(password, admin.password);

    console.log(password);

    if (!isMatch) {
        throw new ValidationError('Email or Password incorrect')
    }

    //!Create Token
    const token = await CreateToken(
        email, admin._id, admin.role,
        '24h'
    );

    return {
        status: "success",
        massage: "Login Seccess",
        token
    }
};

//!Admin Profile Service
exports.adminProfileService = async (req) => {
    const adminId = req.headers.id;

    const admin = await adminModel.findById({ _id: adminId });

    return { status: 'Success', data: admin }
};

//!Send Otp For Admin Email Verification
exports.adminOtpSendService = async (req) => {
    const { email } = req.body;
    const adminId = req.headers.id;
    const emailSubject = 'Verification For Change Admin Email';

    const existingEmail = await adminModel.findOne({ email });

    if (existingEmail) {
        throw new ValidationError('Email already exists')
    }

    await sendOtpService(email, emailSubject, adminModel, adminId);

    return { status: 'Success', massage: 'Email sent successfully' }

};

//!Admin Email Update
exports.adminEmailUpdate = async (req) => {
    const { email, otp } = req.body;
    const adminId = req.headers.id;

    if (!email) {
        throw new ValidationError('Email is required')
    }
    if (!otp) {
        throw new ValidationError('Otp is required')
    }

    await verifyOtpService(email, otp, adminModel, adminId);

    const emailUpdate = await adminModel.updateOne(
        { _id: adminId },
        { email }
    );

    if (!emailUpdate) {
        throw new ValidationError('Email update failed')
    }

    return { status: 'Success', massage: 'Email has been Updated' }
}

//!Admin Profile Update Service
exports.adminProfileUpdateService = async (req) => {
    const reqBody = req.body;
    const adminId = req.headers.id;

    //!Find And Update Admin Profile
    await adminModel.updateOne(
        { _id: adminId },
        { $set: reqBody },
        { upsert: true }
    );

    return { status: "success", message: "Profile Save Changed!" };
};

//!Admin Password Update Service
exports.adminPasswordUpdateService = async (req) => {
    const { password, confirmPassword } = req.body;

    if (!password) {
        throw new ValidationError('Password is required')
    }
    if (password.lenght === 6) {
        throw new ValidationError('Password must be at least 6 characters')
    }
    if (!confirmPassword) {
        throw new ValidationError('Confirm Password is required')
    }
    if (password !== confirmPassword) {
        throw new ValidationError('password and confirm password does not match')
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await adminModel.findByIdAndUpdate(
        { _id: req.headers.id },
        { password: hashedPassword }
    );

    return { status: 'Success', massage: 'Password has been Updated' }

};