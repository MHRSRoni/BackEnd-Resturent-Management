const { ValidationError } = require('custom-error-handlers/error')
const bcrypt = require('bcrypt');
const staffModel = require('../models/staffModel');
const { CreateToken } = require('../configs/CreateToken');
const { sendOtpService, verifyOtpService } = require('./otpService');
const { sendVerifyEmail, verifyEmail } = require('../utils/verifyEmail');


//!Staff Register Service
exports.staffRegisterService = async (req) => {
    const { name, email, username, password, phoneNo, address, dateOfBirth, gender, nationalId, backAccountNumber, employeeId, position, salary, insurance, healthStatus, joiningDate }
        = req.body;

    if (!name || !email || !username || !password || !phoneNo || !address || !dateOfBirth || !nationalId || !backAccountNumber || !employeeId || !position || !salary || !healthStatus || !joiningDate || !gender || !insurance) {

        throw new ValidationError('Required field is empty');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const staff = await staffModel.create({ name, email, username, password: hashedPassword, phoneNo, address, dateOfBirth, gender, nationalId, backAccountNumber, employeeId, position, salary, insurance, healthStatus, joiningDate })

    return {
        status: 'Success',
        massage: 'Staff Account has been Created',
        data: staff
    }

};

//!Staff Login Service
exports.staffLoginService = async (req) => {
    const { email, password } = req.body;

    //!Find Staff With Email
    const staff = await staffModel.findOne({ email });

    if (!staff) {
        throw new ValidationError('Staff Not Found')
    }

    //!Match Password to Provided Password
    const isMatch = await bcrypt.compare(password, staff.password);

    if (!isMatch) {
        throw new ValidationError('Email or Password incorrect')
    }

    //!Create Token
    const token = await CreateToken(
        email, staff._id, staff.role,
        '24h'
    );

    return {
        status: "success",
        massage: "Login Seccess",
        token
    }
};

//!Staff Profile Service
exports.staffProfileService = async (req) => {
    const staffId = req.headers.id;

    const admin = await staffModel.findById({ _id: staffId });

    return { status: 'Success', data: admin }
};

//!Staff Email Update
exports.staffEmailUpdate = async (req) => {
    const { email } = req.body;
    const staffId = req.headers.id;

    if (!email) {
        throw new ValidationError('Email is required')
    }

    const emailUpdate = await staffModel.updateOne(
        { _id: staffId },
        { email }
    );

    if (!emailUpdate) {
        throw new ValidationError('Email update failed')
    }

    return { status: 'Success', massage: 'Email has been Updated' }
};

//!Staff Profile Update Service
exports.staffProfileUpdateService = async (req) => {
    const reqBody = req.body;
    const staffId = req.headers.id;

    //!Find And Update Admin Profile
    await staffModel.updateOne(
        { _id: staffId },
        { $set: reqBody },
        { upsert: true }
    );

    return { status: "success", message: "Profile Save Changed!" };
};

//!Staff Password Update Service
exports.staffPasswordUpdateService = async (req) => {
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

    await staffModel.findByIdAndUpdate(
        { _id: req.headers.id },
        { password: hashedPassword }
    );

    return { status: 'Success', massage: 'Password has been Updated' }

};