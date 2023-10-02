const { Schema, model } = require('mongoose');

const staffSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    nationalId: {
        type: String,
        required: true
    },
    backAccountNumber: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    insurance: {
        type: Boolean,
        default: false
    },
    healthStatus: {
        type: String,
        required: true
    },
    joiningDate: {
        type: Date
    },
    role: {
        type: String,
        default: 'staff'
    },
    otp: {
        type: Number,
        default: 0
    }

}, { timestamps: true, versionKey: false });

const staffModel = model('staffs', staffSchema);

module.exports = staffModel;